from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.user import User

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)

@router.get("")
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    conversations = (
        db.query(Conversation).filter(Conversation.user_id == current_user.id).all()
    )
    return conversations

@router.get("/{conversation_id}")
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_db)
):
    messages = (
        db.query(Message).filter(Message.conversation_id == conversation_id).order_by(Message.id.asc()).all()
    )
    return messages