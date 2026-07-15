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
            
        # conversation = Conversation(
        #     user_id=user_id
        # )
        
        conversation = Conversation(
            user_id=user_id,
            title="New Conversation",
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
        content: str,
    ):

        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content,
        )

        db.add(message)
        db.commit()

        if role != "user":
            return

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

        if conversation is None:
            return

        if conversation.title != "New Conversation":
            return

        title = content.strip()

        if len(title) > 50:
            title = title[:50] + "..."

        conversation.title = title

        db.commit()
    
    @staticmethod
    def get_conversations(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(Conversation)
            .filter(
                Conversation.user_id == user_id
            )
            .order_by(
                Conversation.updated_at.desc()
            )
            .all()
        )
        
    @staticmethod
    def rename_conversation(
        db: Session,
        conversation_id: int,
        title: str,
        user_id: int,
    ):

        conversation = (

            db.query(Conversation)

            .filter(

                Conversation.id == conversation_id,

                Conversation.user_id == user_id,

            )

            .first()

        )

        if conversation is None:

            return None

        conversation.title = title

        db.commit()

        db.refresh(conversation)

        return conversation    
    
    @staticmethod
    def delete_conversation(
        db: Session,
        conversation_id: int,
        user_id: int,
    ):

        conversation = (

            db.query(Conversation)

            .filter(

                Conversation.id == conversation_id,

                Conversation.user_id == user_id,

            )

            .first()

        )

        if conversation is None:

            return False

        (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation.id
        )
        .delete(
            synchronize_session=False
        )
    )

        db.delete(conversation)

        db.commit()

        return True
    
    @staticmethod
    def search_conversations(
        db: Session,
        user_id: int,
        query: str,
    ):

        return (

            db.query(Conversation)

            .filter(

                Conversation.user_id == user_id,

                Conversation.title.ilike(f"%{query}%"),

            )

            .order_by(

                Conversation.updated_at.desc()

            )

            .all()

        )