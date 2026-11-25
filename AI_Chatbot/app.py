import json
import logging
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from llm import stream_answer
from reranking import rerank_documents
from retrieval import get_index, retrieve_documents

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        get_index()
        logger.info("FAISS index loaded successfully.")
    except Exception as exc:
        logger.warning("FAISS index could not be loaded at startup: %s", exc)
    yield


app = FastAPI(title="Portfolio Chatbot API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, description="User question")


def sse_event(payload: dict) -> str:
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"


@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio Chatbot API is running."}


@app.get("/health")
async def health():
    try:
        index, _ = get_index()
        return {"status": "ok", "vectors": int(index.ntotal)}
    except Exception as exc:
        return {"status": "degraded", "error": str(exc)}


@app.post("/chatrobot")
async def chatrobot(request: ChatRequest, http_request: Request):
    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    if question.lower() in ["hello", "hi", "hey", "how are you?", "good morning", "good afternoon", "good evening"]:
        return StreamingResponse(
            iter([sse_event({"token": "Hello! How can I assist you with your portfolio today?"}), sse_event({"done": True})]),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )


    def event_stream():
        try:
            yield sse_event({"status": "Searching portfolio knowledge..."})

            retrieved_documents = retrieve_documents(question, top_k=10)

            yield sse_event({"status": "Ranking relevant information..."})
            final_documents = rerank_documents(question, retrieved_documents, top_k=5)

            yield sse_event({"status": "Generating answer..."})

            has_token = False
            for token in stream_answer(question, final_documents):
                if token:
                    has_token = True
                    yield sse_event({"token": token})

            if not has_token:
                yield sse_event(
                    {
                        "token": "I could not generate an answer from the available portfolio information."
                    }
                )

            yield sse_event({"done": True})
        except Exception as exc:
            logger.exception("Chatbot request failed")
            yield sse_event({"error": str(exc)})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)