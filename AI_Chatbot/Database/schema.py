
from datetime import datetime, timezone
from pydantic import BaseModel, Field


class AISettingsSchema(BaseModel):
    id: str = "global"
    rag_enabled: bool = True
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class AIUsageSchema(BaseModel):
    request_id: str
    question: str
    model: str

    status: str = "running"

    input_tokens: int = 0
    output_tokens: int = 0
    total_tokens: int = 0

    input_cost: float = 0.0
    output_cost: float = 0.0
    total_cost: float = 0.0

    retrieval_ms: float = 0.0
    reranking_ms: float = 0.0
    llm_ms: float = 0.0
    total_duration_ms: float = 0.0

    error: str | None = None

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    completed_at: datetime | None = None
