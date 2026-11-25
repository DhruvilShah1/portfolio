
from sentence_transformers import SentenceTransformer


# Load model once when this module is imported
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):

    texts = [chunk.page_content for chunk in chunks]

    vectors = model.encode(
        texts,
        convert_to_numpy=True,
        show_progress_bar=True
    )

    print(f"Total Embeddings: {len(vectors)}")
    print(f"Vector Dimensions: {vectors.shape[1]}")

    return vectors
