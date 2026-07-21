from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.ai.graphs.support_graph import graph
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=['Chat']
)

@router.post("", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    ):
    try:
        
        conversation = ChatService.get_or_create_conversation(
            db=db,
            conversation_id=request.conversation_id,
            user_id=current_user.id
        )
        
        history = ChatService.get_conversation_messages(db, conversation.id)
        chat_history = [
            f"{message.role}: {message.content}"
            for message in history
        ]
        
        ChatService.save_message(
            db=db,
            conversation_id=conversation.id,
            role="user",
            content=request.question
        )

        result = graph.invoke(
            {
                "question": request.question,
                "rewrite_count": 0,
                "generation_count": 0,
                "chat_history": chat_history,
                "messages": [],
            }
        )
        if not result.get("answer"):
            result["answer"] = (
                "I couldn't find relevant information in the knowledge base."
            )

        if not result.get("sources"):
            result["confidence"] = 0.0
        ChatService.save_message(
            db=db,
            conversation_id=conversation.id,
            role="assistant",
            content=result["answer"]
        )
        return ChatResponse(
            success=True,
            conversation_id=conversation.id,
            answer=result["answer"],
            confidence=result["confidence"],
            sources=result["sources"],
            error=None
        )
    except Exception as e:
        return ChatResponse(
            success=False,
            conversation_id=0,
            answer="",
            confidence=0,
            sources=[],
            error=str(e),
        )
        