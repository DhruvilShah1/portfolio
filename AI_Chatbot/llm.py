
import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.5-flash-lite"
)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def stream_answer(question, final_documents, on_usage=None):
    """
    Streams Gemini output.

    on_usage is an optional callback that receives
    actual token usage metadata when available.
    """

    context = "\n\n".join(
        str(doc["content"])
        for doc in final_documents
    )

    prompt = f"""
You are an AI assistant for a personal portfolio.

Answer questions using the provided context.
If the context does not contain the answer,
say that you don't have enough information.

CONTEXT:
{context}

QUESTION:
{question}

ANSWER:
"""

    llm_start = time.perf_counter()

    input_tokens = 0
    output_tokens = 0
    usage_received = False

    stream = client.models.generate_content_stream(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.3
        )
    )

    for chunk in stream:

        # Capture usage metadata when the provider
        # exposes it in a streaming response.
        usage = getattr(chunk, "usage_metadata", None)

        if usage is not None:

            input_tokens = (
                getattr(usage, "prompt_token_count", 0)
                or 0
            )

            output_tokens = (
                getattr(usage, "candidates_token_count", 0)
                or 0
            )

            usage_received = True

        token = getattr(chunk, "text", None)

        if token:
            yield token

    llm_ms = (
        time.perf_counter() - llm_start
    ) * 1000

    # Report usage after streaming has completed.
    if on_usage:

        on_usage({
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "total_tokens": (
                input_tokens + output_tokens
            ),
            "llm_ms": llm_ms,
            "usage_received": usage_received
        })
