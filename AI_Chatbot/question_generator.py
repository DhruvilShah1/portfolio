import json
import os

from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama").strip().lower()
MODEL_NAME = os.getenv("OLLAMA_MODEL", "qwen2.5:3b").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()


def _generate_with_ollama(prompt):
    import ollama

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        format="json",
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
        config={"response_mime_type": "application/json"},
    )

    response_text = getattr(response, "text", None)
    if not response_text:
        raise ValueError("Gemini returned an empty response.")

    return response_text


def generate_questions(chunks, questions_per_chunk=2, provider=None):
    generated_questions = []
    selected_provider = (provider or LLM_PROVIDER).strip().lower()

    for chunk_number, chunk in enumerate(chunks, start=1):
        content = chunk.page_content

        if not content.strip():
            continue

        prompt = f"""
You are an expert question-generation system.

Generate {questions_per_chunk} useful questions from the
provided document content.

Rules:
1. Questions must be based ONLY on the given content.
2. Do not invent facts.
3. Questions should test important information.
4. Generate clear and meaningful questions.
5. Provide an accurate reference answer for each question.
6. Avoid duplicate questions.

DOCUMENT CONTENT:
{content}

Return JSON in this exact structure:

{{
    "questions": [
        {{
            "question": "Question here",
            "ground_truth": "Correct answer based on the document"
        }}
    ]
}}
"""

        try:
            if selected_provider == "gemini":
                response_text = _generate_with_gemini(prompt)
            elif selected_provider == "ollama":
                response_text = _generate_with_ollama(prompt)
            else:
                raise ValueError(
                    f"Unsupported LLM provider '{selected_provider}'. "
                    "Use 'ollama' or 'gemini'."
                )

            result = json.loads(response_text)

            for item in result.get("questions", []):
                if not item.get("question") or not item.get("ground_truth"):
                    continue

                generated_questions.append(
                    {
                        "question": item["question"],
                        "ground_truth": item["ground_truth"],
                        "source_chunk": chunk_number,
                        "metadata": chunk.metadata,
                    }
                )

            print(f"Questions generated from chunk {chunk_number}")

        except (json.JSONDecodeError, KeyError, TypeError) as error:
            print(f"Could not parse chunk {chunk_number}: {error}")

        except Exception as error:
            print(f"Question generation failed for chunk {chunk_number}: {error}")

    print("\nTotal Questions Generated:", len(generated_questions))

    return generated_questions