from typing import Annotated, TypedDict
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    question: str
    context: list
    answer: str
    retrieval_ok: str
    rewrite_count: int
    messages: Annotated[list, add_messages]