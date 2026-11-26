
import json
import logging
import os
import threading
import time
import uuid

from datetime import datetime, timezone
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from llm import stream_answer
from reranking import rerank_documents
from retrieval import get_index, retrieve_documents

from Connection.db import (
    mongo_client,
    settings_collection,
    usage_collection,
    initialize_database
)

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.5-flash-lite"
)

INPUT_PRICE_PER_1M = float(
    os.getenv("INPUT_PRICE_PER_1M", "0")
)

OUTPUT_PRICE_PER_1M = float(
    os.getenv("OUTPUT_PRICE_PER_1M", "0")
)

active_requests = set()
control_lock = threading.Lock()


def utc_now():
    return datetime.now(timezone.utc)


def is_rag_enabled():
    settings = settings_collection.find_one(
        {"_id": "global"}
    )

    return bool(
        settings and settings.get("rag_enabled", False)
    )


def calculate_cost(input_tokens, output_tokens):

    input_cost = (
        input_tokens * INPUT_PRICE_PER_1M
    ) / 1_000_000

    output_cost = (
        output_tokens * OUTPUT_PRICE_PER_1M
    ) / 1_000_000

    return input_cost, output_cost


def backfill_unpriced_usage_records():

    if not INPUT_PRICE_PER_1M and not OUTPUT_PRICE_PER_1M:
        return

    result = usage_collection.update_many(
        {
            "model": MODEL_NAME,
            "total_tokens": {"$gt": 0},
            "total_cost": 0
        },
        [
            {
                "$set": {
                    "input_cost": {
                        "$divide": [
                            {
                                "$multiply": [
                                    {
                                        "$ifNull": [
                                            "$input_tokens",
                                            0
                                        ]
                                    },
                                    INPUT_PRICE_PER_1M
                                ]
                            },
                            1_000_000
                        ]
                    },
                    "output_cost": {
                        "$divide": [
                            {
                                "$multiply": [
                                    {
                                        "$ifNull": [
                                            "$output_tokens",
                                            0
                                        ]
                                    },
                                    OUTPUT_PRICE_PER_1M
                                ]
                            },
                            1_000_000
                        ]
                    }
                }
            },
            {
                "$set": {
                    "total_cost": {
                        "$add": [
                            "$input_cost",
                            "$output_cost"
                        ]
                    }
                }
            }
        ]
    )

    if result.modified_count:
        logger.info(
            "Recalculated cost for %s existing usage records.",
            result.modified_count
        )


def sse_event(payload: dict):
    return (
        f"data: {json.dumps(payload, ensure_ascii=False)}"
        "\n\n"
    )


@asynccontextmanager
async def lifespan(_: FastAPI):

    try:
        initialize_database()
        backfill_unpriced_usage_records()
        get_index()

        logger.info("FAISS index loaded.")
        logger.info("MongoDB initialized.")

    except Exception as exc:
        logger.exception(
            "Application startup failed: %s", exc
        )
        raise

    yield

    mongo_client.close()


app = FastAPI(
    title="Portfolio Chatbot API",
    version="2.0.0",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_origin_regex=r"https?://(localhost|127.0.0.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        description="User question"
    )


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Portfolio Chatbot API is running."
    }


@app.get("/health")
def health():

    try:
        mongo_client.admin.command("ping")
        index, _ = get_index()

        return {
            "status": "ok",
            "vectors": int(index.ntotal)
        }

    except Exception as exc:

        return {
            "status": "degraded",
            "error": str(exc)
        }


# =====================================================
# RAG CONTROL
# =====================================================

@app.get("/rag/status")
def rag_status():

    settings = settings_collection.find_one(
        {"_id": "global"}
    )

    if settings is None:
        raise HTTPException(
            status_code=503,
            detail="AISettings not initialized."
        )

    with control_lock:
        active_count = len(active_requests)

    return {
        "rag_enabled": settings.get(
            "rag_enabled", False
        ),
        "active_requests": active_count
    }


@app.post("/rag/stop")
def stop_rag():

    with control_lock:

        settings_collection.update_one(
            {"_id": "global"},
            {"$set": {"rag_enabled": False}},
            upsert=True
        )

        for cancel_event in list(active_requests):
            cancel_event.set()

    logger.warning("RAG globally stopped.")

    return {
        "success": True,
        "rag_enabled": False,
        "message": "RAG has been disabled."
    }


@app.post("/rag/start")
def start_rag():

    with control_lock:

        settings_collection.update_one(
            {"_id": "global"},
            {"$set": {"rag_enabled": True}},
            upsert=True
        )

    logger.info("RAG globally enabled.")

    return {
        "success": True,
        "rag_enabled": True,
        "message": "RAG has been enabled."
    }


# =====================================================
# USAGE TRACKING HELPERS
# =====================================================

def create_usage_record(request_id, question):

    usage_collection.insert_one({

        "request_id": request_id,
        "question": question,
        "model": MODEL_NAME,

        "status": "running",

        "input_tokens": 0,
        "output_tokens": 0,
        "total_tokens": 0,

        "input_cost": 0.0,
        "output_cost": 0.0,
        "total_cost": 0.0,

        "retrieval_ms": 0.0,
        "reranking_ms": 0.0,
        "llm_ms": 0.0,
        "total_duration_ms": 0.0,

        "usage_received": False,

        "error": None,

        "created_at": utc_now(),
        "completed_at": None
    })


def update_usage_record(request_id, fields):

    usage_collection.update_one(
        {"request_id": request_id},
        {"$set": fields}
    )


def finalize_usage_record(
    request_id,
    status,
    total_duration_ms,
    error=None
):

    update_usage_record(
        request_id,
        {
            "status": status,
            "total_duration_ms": total_duration_ms,
            "completed_at": utc_now(),
            "error": error
        }
    )


# =====================================================
# CHAT
# =====================================================

@app.post("/chatrobot")
def chatrobot(request: ChatRequest):

    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    # Greeting bypass.
    greetings = [
        "hello",
        "hi",
        "hey",
        "how are you?",
        "good morning",
        "good afternoon",
        "good evening"
    ]

    if question.lower() in greetings:

        return StreamingResponse(
            iter([
                sse_event({
                    "token": (
                        "Hello! How can I assist you "
                        "with your portfolio today?"
                    )
                }),
                sse_event({"done": True})
            ]),
            media_type="text/event-stream"
        )

    # Register request only if RAG is enabled.
    with control_lock:

        if not is_rag_enabled():

            raise HTTPException(
                status_code=503,
                detail="RAG is currently stopped."
            )

        cancel_event = threading.Event()
        active_requests.add(cancel_event)

    request_id = f"req_{uuid.uuid4().hex}"

    request_start = time.perf_counter()

    # Create a request record before pipeline execution.
    try:

        create_usage_record(
            request_id,
            question
        )

    except Exception:

        with control_lock:
            active_requests.discard(cancel_event)

        logger.exception(
            "Failed to create usage record."
        )

        raise HTTPException(
            status_code=503,
            detail="Request tracking database unavailable."
        )


    def event_stream():

        status = "success"
        error_message = None

        retrieval_ms = 0.0
        reranking_ms = 0.0
        llm_ms = 0.0

        input_tokens = 0
        output_tokens = 0

        usage_received = False

        try:

            # Check before starting the pipeline.
            if cancel_event.is_set():

                status = "cancelled"

                yield sse_event({
                    "stopped": True
                })

                return

            # -------------------------------
            # RETRIEVAL
            # -------------------------------

            yield sse_event({
                "status": "Searching portfolio knowledge..."
            })

            retrieval_start = time.perf_counter()

            retrieved_documents = retrieve_documents(
                question,
                top_k=10
            )

            retrieval_ms = (
                time.perf_counter() - retrieval_start
            ) * 1000

            update_usage_record(
                request_id,
                {
                    "retrieval_ms": retrieval_ms
                }
            )

            if cancel_event.is_set():

                status = "cancelled"

                yield sse_event({
                    "stopped": True
                })

                return

            # -------------------------------
            # RERANKING
            # -------------------------------

            yield sse_event({
                "status": "Ranking relevant information..."
            })

            reranking_start = time.perf_counter()

            final_documents = rerank_documents(
                question,
                retrieved_documents,
                top_k=5
            )

            reranking_ms = (
                time.perf_counter() - reranking_start
            ) * 1000

            update_usage_record(
                request_id,
                {
                    "reranking_ms": reranking_ms
                }
            )

            if cancel_event.is_set():

                status = "cancelled"

                yield sse_event({
                    "stopped": True
                })

                return

            # -------------------------------
            # LLM
            # -------------------------------

            yield sse_event({
                "status": "Generating answer..."
            })

            has_token = False

            def on_usage(usage):

                nonlocal input_tokens
                nonlocal output_tokens
                nonlocal llm_ms
                nonlocal usage_received

                input_tokens = usage.get(
                    "input_tokens", 0
                )

                output_tokens = usage.get(
                    "output_tokens", 0
                )

                llm_ms = usage.get(
                    "llm_ms", 0.0
                )

                usage_received = usage.get(
                    "usage_received", False
                )

                input_cost, output_cost = (
                    calculate_cost(
                        input_tokens,
                        output_tokens
                    )
                )

                update_usage_record(
                    request_id,
                    {
                        "input_tokens": input_tokens,
                        "output_tokens": output_tokens,
                        "total_tokens": (
                            input_tokens + output_tokens
                        ),

                        "input_cost": input_cost,
                        "output_cost": output_cost,
                        "total_cost": (
                            input_cost + output_cost
                        ),

                        "llm_ms": llm_ms,
                        "usage_received": usage_received
                    }
                )

            for token in stream_answer(
                question,
                final_documents,
                on_usage=on_usage
            ):

                if cancel_event.is_set():

                    status = "cancelled"

                    yield sse_event({
                        "stopped": True
                    })

                    return

                if token:

                    has_token = True

                    yield sse_event({
                        "token": token
                    })

            if cancel_event.is_set():

                status = "cancelled"

                yield sse_event({
                    "stopped": True
                })

                return

            if not has_token:

                yield sse_event({
                    "token": (
                        "I could not generate an answer "
                        "from the available portfolio "
                        "information."
                    )
                })

            yield sse_event({
                "done": True,
                "request_id": request_id
            })


        except Exception as exc:

            status = "failed"
            error_message = str(exc)

            logger.exception(
                "Chatbot request failed."
            )

            yield sse_event({
                "error": "Unable to generate answer."
            })


        finally:

            total_duration_ms = (
                time.perf_counter() - request_start
            ) * 1000

            try:

                finalize_usage_record(
                    request_id,
                    status,
                    total_duration_ms,
                    error_message
                )

            except Exception:

                logger.exception(
                    "Failed to finalize usage record."
                )

            with control_lock:
                active_requests.discard(cancel_event)


    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


# =====================================================
# REQUEST TRACKING API
# =====================================================

@app.get("/usage/recent")
def recent_usage(
    limit: int = Query(
        default=20,
        ge=1,
        le=100
    ),
    skip: int = Query(
        default=0,
        ge=0
    )
):

    records = list(
        usage_collection.find(
            {},
            {"_id": 0}
        )
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    )

    total = usage_collection.count_documents({})

    return {
        "total": total,
        "records": records
    }


@app.get("/usage/summary")
def usage_summary():

    pipeline = [
        {
            "$group": {
                "_id": None,

                "total_requests": {
                    "$sum": 1
                },

                "successful_requests": {
                    "$sum": {
                        "$cond": [
                            {"$eq": ["$status", "success"]},
                            1,
                            0
                        ]
                    }
                },

                "failed_requests": {
                    "$sum": {
                        "$cond": [
                            {"$eq": ["$status", "failed"]},
                            1,
                            0
                        ]
                    }
                },

                "cancelled_requests": {
                    "$sum": {
                        "$cond": [
                            {"$eq": ["$status", "cancelled"]},
                            1,
                            0
                        ]
                    }
                },

                "total_input_tokens": {
                    "$sum": "$input_tokens"
                },

                "total_output_tokens": {
                    "$sum": "$output_tokens"
                },

                "total_tokens": {
                    "$sum": "$total_tokens"
                },

                "total_cost": {
                    "$sum": "$total_cost"
                },

                "average_duration_ms": {
                    "$avg": "$total_duration_ms"
                }
            }
        }
    ]

    result = list(
        usage_collection.aggregate(pipeline)
    )

    if not result:

        return {
            "total_requests": 0,
            "successful_requests": 0,
            "failed_requests": 0,
            "cancelled_requests": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "total_tokens": 0,
            "total_cost": 0.0,
            "average_duration_ms": 0.0
        }

    result[0].pop("_id", None)

    return result[0]


# =====================================================
# RUN
# =====================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
