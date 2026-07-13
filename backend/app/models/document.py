from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Document(Base):
    __tablename__ = "documents"

    id=Column(Integer, primary_key=True, index=True)
    filename=Column(String(255), nullable=False)
    original_filename=Column(String(255), nullable=False)
    content_type=Column(String(100), nullable=False)
    file_size = Column(Integer, nullable=False)
    storage_path = Column(String(500), nullable=False)
    status = Column(
        String(50),
        nullable=False,
        default="PROCESSING"
    )
    uploaded_by=Column(Integer, ForeignKey("users.id"))
    created_at=Column(DateTime(timezone=True), server_default=func.now())