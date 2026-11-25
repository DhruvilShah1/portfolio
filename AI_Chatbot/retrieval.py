
import numpy as np

from embeddings import model
from faiss_store import load_faiss_index

_index = None
_chunks = None


def get_index():
    global _index, _chunks
    if _index is None or _chunks is None:
        _index, _chunks = load_faiss_index()
    return _index, _chunks


def retrieve_documents(query, top_k=5, index=None, chunks=None):
    if index is None or chunks is None:
        index, chunks = get_index()

    query_vector = model.encode([query], convert_to_numpy=True)
    query_vector = np.asarray(query_vector, dtype=np.float32)

    distances, indices = index.search(query_vector, top_k)

    retrieved_documents = []
    for distance, index_position in zip(distances[0], indices[0]):
        if index_position == -1:
            continue

        document = chunks[index_position]
        retrieved_documents.append(
            {
                "content": document.page_content,
                "metadata": document.metadata,
                "distance": float(distance),
            }
        )

    print("Retrieved Documents:", len(retrieved_documents))
    return retrieved_documents
