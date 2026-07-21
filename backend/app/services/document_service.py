import os
import shutil
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.models.document import Document
from app.ai.loaders.pdf_loader import PDFLoader
from app.ai.splitters.text_splitter import TextSplitter
from app.ai.vectorstores.qdrant_client import QdrantManager
from app.services.ingestion_service import IngestionService
from app.ai.loaders.text_loader import TXTLoader
from app.ai.loaders.docx_loader import DOCXLoader
from app.ai.loaders.markdown_loader import MarkdownLoader
from app.ai.loaders.faq_loader import FAQLoader
from app.schemas.faq import FAQUploadRequest
import os
from sqlalchemy import func

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
        pages = PDFLoader.load(
            storage_path
        )

        IngestionService.ingest(
            documents=pages,
            document_id=document.id,
            filename=document.original_filename,
        )

        document.status = "COMPLETED"
        db.commit()
        db.refresh(document)
        return document
    
    @staticmethod
    def get_documents(
        db: Session,
        user_id: int
    ):
        return (
            db.query(Document).filter(Document.uploaded_by == user_id).order_by(Document.id.desc()).all()
        )
    
    @staticmethod
    def get_document(
        db: Session,
        document_id: int,
        user_id: int
    ):
        return (
            db.query(Document).filter(Document.id == document_id, Document.uploaded_by == user_id).first()
        )
        
    @staticmethod
    def delete_document(
        db: Session,
        document_id: int,
        user_id: int
    ):
        document = (
            db.query(Document).filter(Document.id == document_id, Document.uploaded_by == user_id).first()
        )
        if document is None:
            return False
        
        import os
        
        if os.path.exists(
            document.storage_path
        ):
            os.remove(document.storage_path)
        QdrantManager.delete_document(
            document.id
        )    
        db.delete(document)
        db.commit()
        return True
    
    @staticmethod
    def reindex_document(
        db: Session,
        document_id: int,
        user_id: int
    ):
        document = (
            db.query(Document)
            .filter(
                Document.id == document_id,
                Document.uploaded_by == user_id,
            )
            .first()
        )
        
        if document is None:
            return None
        
        document.status = "PROCESSING"
        db.commit()
        
        try:
            QdrantManager.delete_document(document.id)
            pages = PDFLoader.load(
                document.storage_path
            )

            IngestionService.ingest(
                documents=pages,
                document_id=document.id,
                filename=document.original_filename,
            )
            document.status = "READY"
            db.commit()
            db.refresh(document)
            return document
        except Exception:
            document.status = "FAILED"
            db.commit()
            raise
        
    @staticmethod
    def upload_txt(
        db: Session,
        file: UploadFile,
        user_id: int,
    ):
        import os
        import shutil
        import uuid
        extension = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4()}{extension}"
        storage_path = os.path.join(
            "app",
            "uploads",
            filename,
        )
        with open(storage_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )
        document = Document(
            filename=filename,
            original_filename=file.filename,
            content_type=file.content_type,
            file_size=os.path.getsize(storage_path),
            storage_path=storage_path,
            uploaded_by=user_id,
            status="PROCESSING",
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        pages = TXTLoader.load(
            storage_path
        )
        IngestionService.ingest(
            documents=pages,
            document_id=document.id,
            filename=document.original_filename,
        )
        document.status = "READY"
        db.commit()
        db.refresh(document)
        return document
    
    @staticmethod
    def upload_docx(
        db: Session,
        file: UploadFile,
        user_id: int,
    ):

        import os
        import shutil
        import uuid

        extension = os.path.splitext(
            file.filename
        )[1]

        filename = f"{uuid.uuid4()}{extension}"

        storage_path = os.path.join(
            "app",
            "uploads",
            filename,
        )

        with open(storage_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        document = Document(
            filename=filename,
            original_filename=file.filename,
            storage_path=storage_path,
            uploaded_by=user_id,
            status="PROCESSING",
        )                           

        db.add(document)

        db.commit()

        db.refresh(document)

        pages = DOCXLoader.load(
            storage_path
        )

        IngestionService.ingest(

            documents=pages,

            document_id=document.id,

            filename=document.original_filename,

        )

        document.status = "READY"

        db.commit()

        db.refresh(document)

        return document
    
    @staticmethod
    def upload_markdown(
        db: Session,
        file: UploadFile,
        user_id: int,
    ):

        import os
        import shutil
        import uuid

        extension = os.path.splitext(
            file.filename
        )[1]

        filename = f"{uuid.uuid4()}{extension}"

        storage_path = os.path.join(
            "app",
            "uploads",
            filename,
        )

        with open(storage_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        document = Document(
            filename=filename,
            original_filename=file.filename,
            content_type=file.content_type,
            file_size=os.path.getsize(storage_path),
            storage_path=storage_path,
            uploaded_by=user_id,
            status="PROCESSING",
        )

        db.add(document)

        db.commit()

        db.refresh(document)

        pages = MarkdownLoader.load(
            storage_path
        )

        IngestionService.ingest(

            documents=pages,

            document_id=document.id,

            filename=document.original_filename,

        )

        document.status = "READY"

        db.commit()

        db.refresh(document)

        return document
    
    @staticmethod
    def upload_faq(
        db: Session,
        request: FAQUploadRequest,
        user_id: int,
    ):

        document = Document(
            filename=request.title,
            original_filename=request.title,
            content_type="application/json",
            file_size=0,
            storage_path="FAQ",
            uploaded_by=user_id,
            status="PROCESSING",
        )

        db.add(document)
        db.commit()
        db.refresh(document)
        pages = FAQLoader.load(
            request
        )
        IngestionService.ingest(
            documents=pages,
            document_id=document.id,
            filename=document.original_filename,
        )

        document.status = "READY"
        db.commit()
        db.refresh(document)
        return document
    
    @staticmethod
    def knowledge_statistics(
        db: Session,
        user_id: int,
    ):

        documents = (
            db.query(Document)
            .filter(
                Document.uploaded_by == user_id
            )
            .all()
        )
        stats = {
            "total_documents": len(documents),
            "total_pdf": 0,
            "total_txt": 0,
            "total_docx": 0,
            "total_markdown": 0,
            "total_faq": 0,
        }

        for document in documents:

            if document.storage_path == "FAQ":

                stats["total_faq"] += 1

                continue

            extension = os.path.splitext(

                document.original_filename

            )[1].lower()

            if extension == ".pdf":

                stats["total_pdf"] += 1

            elif extension == ".txt":

                stats["total_txt"] += 1

            elif extension == ".docx":

                stats["total_docx"] += 1

            elif extension in [".md", ".markdown"]:

                stats["total_markdown"] += 1

        return stats
    
    
    