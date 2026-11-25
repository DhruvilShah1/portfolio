
import os

from dotenv import load_dotenv

load_dotenv()

# LLM provider: "ollama" or "gemini"
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama").strip().lower()

# Ollama configuration
MODEL_NAME = os.getenv("OLLAMA_MODEL", "qwen2.5:3b").strip()

# Gemini configuration
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()


def _build_prompt(query, retrieved_documents):
    context = ""

    for number, document in enumerate(retrieved_documents, start=1):
        metadata = document.get("metadata", {})

        context += f"""
Source {number}:
Page: {metadata.get("page", "Unknown")}
Type: {metadata.get("type", "Unknown")}

Content:
{document.get("content", "")}

"""

    return f"""
You are a helpful AI assistant.

Answer the user's question using ONLY the information
provided in the PDF context below.

Rules:
1. Do not make up information.
2. If the answer is not available in the context,
   clearly say that you could not find it in the PDF.
3. Give clear and concise answers.
4. When possible, mention the source page number.
5. Use the table information when it is relevant.

PDF CONTEXT:
{context}

USER QUESTION:
{query}

ANSWER:
"""


def _generate_with_ollama(prompt):
    import ollama

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        stream=False,
    )

    return response["message"]["content"]


def _generate_with_gemini(prompt):
    if not GEMINI_API_KEY:
        raise ValueError(
            "GEMINI_API_KEY is not set. Add it to .env or the environment."
        )

    from google import genai

    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
    )

    answer = getattr(response, "text", None)
    if not answer:
        raise ValueError("Gemini returned an empty response.")

    return answer


def generate_answer(query, retrieved_documents, provider=None):
    if not retrieved_documents:
        return "I could not find relevant information in the PDF."

    prompt = _build_prompt(query, retrieved_documents)
    selected_provider = (provider or LLM_PROVIDER).strip().lower()

    if selected_provider == "gemini":
        return _generate_with_gemini(prompt)

    if selected_provider == "ollama":
        return _generate_with_ollama(prompt)

    raise ValueError(
        f"Unsupported LLM provider '{selected_provider}'. Use 'ollama' or 'gemini'."
    )


def _stream_with_ollama(prompt):
    import ollama

    stream = ollama.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )

    for chunk in stream:
        token = chunk.get("message", {}).get("content", "")
        if token:
            yield token


def _stream_with_gemini(prompt):
    if not GEMINI_API_KEY:
        raise ValueError(
            "GEMINI_API_KEY is not set. Add it to .env or the environment."
        )

    from google import genai

    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content_stream(
        model=GEMINI_MODEL,
        contents=prompt,
    )

    for chunk in response:
        token = getattr(chunk, "text", None)
        if token:
            yield token


def stream_answer(query, retrieved_documents, provider=None):
    if not retrieved_documents:
        yield "I could not find relevant information in the PDF."
        return

    prompt = _build_prompt(query, retrieved_documents)
    selected_provider = (provider or LLM_PROVIDER).strip().lower()

    if selected_provider == "gemini":
        yield from _stream_with_gemini(prompt)
        return

    if selected_provider == "ollama":
        yield from _stream_with_ollama(prompt)
        return

    raise ValueError(
        f"Unsupported LLM provider '{selected_provider}'. Use 'ollama' or 'gemini'."
    )
