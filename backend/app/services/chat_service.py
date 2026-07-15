from sqlalchemy.orm import Session
from app.models.conversation import Conversation
from app.models.message import Message

class ChatService:
    @staticmethod
    def get_or_create_conversation(
        db: Session,
        conversation_id: int | None,
        user_id: int
    ):
        if conversation_id:
            conversation = (
                db.query(Conversation).filter(Conversation.id == conversation_id, Conversation.user_id == user_id).first()
            )
            if conversation: 
                return conversation
            
        conversation = Conversation(
            user_id=user_id
        )
        
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        return conversation
    
    @staticmethod
    def get_conversation_messages(
        db: Session,
        conversation_id: int
    ):
        return (
            db.query(Message).filter(Message.conversation_id == conversation_id).order_by(Message.id.asc()).all()
        )
    
    
    @staticmethod
    def save_message(
        db: Session,
        conversation_id: int,
        role: str,
        content: str
    ):
        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content
        )
        
        db.add(message)
        db.commit()
    
    # @staticmethod
    # def save_user_message(
    #     db: Session,
    #     conversation_id: int,
    #     message: str
    # ):
    #     db_message = Message(
    #         conversation_id=conversation_id,
    #         role="user",
    #         content=message
    #     )
        
    #     db.add(db_message)
    #     db.commit()

    # @staticmethod
    # def save_assistant_message(
    #     db: Session,
    #     conversation_id: int,
    #     message: str
    # ):
    #     db_message = Message(
    #         conversation_id=conversation_id,
    #         role="assistant",
    #         content=message
    #     )
        
    #     db.add(db_message)
    #     db.commit()