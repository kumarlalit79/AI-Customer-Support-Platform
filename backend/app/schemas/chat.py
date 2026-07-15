from pydantic import BaseModel

class SourceResponse(BaseModel):
    filename: str
    page: int

class ChatRequest(BaseModel):
    question: str
    conversation_id: int | None = None

class ChatResponse(BaseModel):
    success: bool
    conversation_id: int
    answer: str
    confidence: float
    sources: list[SourceResponse]
    error: str | None=None