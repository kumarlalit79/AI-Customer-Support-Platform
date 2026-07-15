from typing import Annotated, TypedDict
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    question: str
    context: list
    answer: str
    sources: list
    confidence: float
    retrieval_ok: str
    hallucination_ok: str
    rewrite_count: int
    generation_count: int
    chat_history: list[str]
    retrieval_scores: list[float]
    messages: Annotated[list, add_messages]