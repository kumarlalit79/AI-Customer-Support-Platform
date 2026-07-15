from pydantic import BaseModel

class SourceResponse(BaseModel):
    page: int
    filename: str

class ChatRequest(BaseModel):
    question: str
    conversation_id: int | None = None

class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceResponse]
    confidence: float
    conversation_id: int
    sources: list[SourceResponse]