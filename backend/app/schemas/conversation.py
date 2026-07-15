from datetime import datetime
from pydantic import BaseModel

class ConversationResponse(BaseModel):

    id: int
    title: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class RenameConversationRequest(BaseModel):
    title: str