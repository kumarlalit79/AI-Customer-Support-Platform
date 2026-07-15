from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.conversation import (
    ConversationResponse,
    RenameConversationRequest,
)
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.get(
    "",
    response_model=list[ConversationResponse],
)
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ChatService.get_conversations(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/search",
    response_model=list[ConversationResponse],
)
def search_conversations(
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ChatService.search_conversations(
        db=db,
        user_id=current_user.id,
        query=query,
    )


@router.patch(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def rename_conversation(
    conversation_id: int,
    request: RenameConversationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = ChatService.rename_conversation(
        db=db,
        conversation_id=conversation_id,
        title=request.title,
        user_id=current_user.id,
    )

    if conversation is None:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return conversation


@router.delete(
    "/{conversation_id}",
)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    success = ChatService.delete_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    if not success:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {

        "success": True

    }


@router.get(
    "/{conversation_id}/messages",
)
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = ChatService.get_or_create_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    if conversation is None:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return ChatService.get_conversation_messages(
        db=db,
        conversation_id=conversation.id,
    )