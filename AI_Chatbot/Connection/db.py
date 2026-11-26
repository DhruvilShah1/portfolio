
import os
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING

load_dotenv()

mongo_client = MongoClient(
    os.getenv("MONGO_URI", "mongodb://localhost:27017"),
    serverSelectionTimeoutMS=5000
)

db = mongo_client["PortfolioAI"]

settings_collection = db["AISettings"]
usage_collection = db["AIUsage"]


def initialize_database():
    mongo_client.admin.command("ping")

    # Initialize existing global RAG settings.
    settings_collection.update_one(
        {"_id": "global"},
        {
            "$setOnInsert": {
                "rag_enabled": True
            }
        },
        upsert=True
    )

    # Indexes for request tracking dashboard.
    usage_collection.create_index(
        [("created_at", ASCENDING)]
    )

    usage_collection.create_index(
        [("status", ASCENDING)]
    )

    usage_collection.create_index(
        [("request_id", ASCENDING)],
        unique=True
    )

    print("MongoDB connected.")
    print("AISettings and AIUsage initialized.")
