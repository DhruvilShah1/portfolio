
import os
import pickle
from pathlib import Path

import faiss
import numpy as np

BASE_DIR = Path(__file__).resolve().parent
INDEX_DIR = BASE_DIR / "faiss_index"
INDEX_PATH = INDEX_DIR / "university.index"
CHUNKS_PATH = INDEX_DIR / "chunks.pkl"


def create_faiss_index(vectors, chunks):
    vectors = np.asarray(vectors, dtype=np.float32)
    dimension = vectors.shape[1]

    index = faiss.IndexFlatL2(dimension)
    index.add(vectors)

    print("FAISS Index Created Successfully")
    print("Total Vectors Stored:", index.ntotal)

    save_faiss_index(index, chunks)
    return index


def save_faiss_index(index, chunks):
    INDEX_DIR.mkdir(parents=True, exist_ok=True)

    faiss.write_index(index, str(INDEX_PATH))

    with open(CHUNKS_PATH, "wb") as file:
        pickle.dump(chunks, file)

    print("FAISS Index and Chunks Saved Successfully")


def load_faiss_index():
    if not INDEX_PATH.exists() or not CHUNKS_PATH.exists():
        raise FileNotFoundError(
            f"FAISS index not found. Expected '{INDEX_PATH}' and '{CHUNKS_PATH}'."
        )

    index = faiss.read_index(str(INDEX_PATH))

    with open(CHUNKS_PATH, "rb") as file:
        chunks = pickle.load(file)

    print("FAISS Index Loaded Successfully")
    return index, chunks
