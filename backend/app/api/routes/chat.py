from fastapi import APIRouter
from app.ai.graphs.support_graph import graph
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(
    prefix="/chat",
    tags=['Chat']
)

@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = graph.invoke(
        {
            "question": request.question,
            "messages": [],
            "rewrite_count": 0
        }
    )
    return ChatResponse(
        answer=result.get(
            "answer",
            "I couldnt answer this question."
        )
    )