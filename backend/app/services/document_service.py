import os
import shutil
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.models.document import Document
from app.ai.loaders.pdf_loader import PDFLoader
from app.ai.splitters.text_splitter import TextSplitter
from app.ai.vectorstores.qdrant_client import QdrantManager

UPLOAD_DIRECTORY = "app/uploads"

class DocumentService:
    @staticmethod
    def upload_document(
        db: Session,
        file: UploadFile,
        user_id: int
    ):
        os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)
        extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{extension}"
        storage_path = os.path.join(
            UPLOAD_DIRECTORY, unique_filename
        )
        with open(storage_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        document = Document(
            filename=unique_filename,
            original_filename=file.filename,
            content_type=file.content_type,
            file_size=os.path.getsize(storage_path),
            storage_path=storage_path,
            uploaded_by=user_id,
            status="UPLOADED"
        )
        
        db.add(document)
        db.commit()
        db.refresh(document)
        documents = PDFLoader.load(storage_path)
        chunks = TextSplitter.split(documents)
        vectorstore = QdrantManager.get_vectorstore()
        for chunk in chunks:
            chunk.metadata["document_id"] = document.id
            chunk.metadata["filename"] = document.original_filename
        vectorstore.add_documents(chunks)
        document.status = "COMPLETED"
        db.commit()
        db.refresh(document)
        return document