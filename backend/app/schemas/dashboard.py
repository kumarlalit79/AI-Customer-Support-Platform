from datetime import datetime
from pydantic import BaseModel

class FileTypeCount(BaseModel):
    pdf: int
    txt: int
    docx: int
    markdown: int
    faq: int


class DashboardResponse(BaseModel):
    total_documents: int
    total_conversations: int
    total_messages: int
    recent_uploads: list[str]
    recent_conversations: list[str]
    file_types: FileTypeCount