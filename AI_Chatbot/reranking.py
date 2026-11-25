
from sentence_transformers import CrossEncoder


# Load reranking model once
reranker_model = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)


def rerank_documents(query, retrieved_documents, top_k=3):

    if not retrieved_documents:
        return []

    # STEP 1: Create question-document pairs
    pairs = [
        [query, document["content"]]
        for document in retrieved_documents
    ]

    # STEP 2: Calculate relevance scores
    scores = reranker_model.predict(pairs)

    # STEP 3: Attach scores to documents
    for document, score in zip(retrieved_documents, scores):
        document["rerank_score"] = float(score)

    # STEP 4: Sort by relevance score
    reranked_documents = sorted(
        retrieved_documents,
        key=lambda document: document["rerank_score"],
        reverse=True
    )

    # STEP 5: Return top results
    final_documents = reranked_documents[:top_k]

    print("Reranked Documents:", len(final_documents))

    return final_documents
