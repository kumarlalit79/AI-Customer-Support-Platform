from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService
from app.schemas.faq import FAQUploadRequest
from app.schemas.statistics import KnowledgeStatisticsResponse

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)

@router.post("/upload", response_model=DocumentResponse)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return DocumentService.upload_document(
            db=db,
            file=file,
            user_id=current_user.id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get(
    "/statistics",
    response_model=KnowledgeStatisticsResponse,
)
def knowledge_statistics(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user),

    ):

        return DocumentService.knowledge_statistics(

            db=db,

            user_id=current_user.id,

        )
    
@router.get(
    "",
    response_model=list[DocumentResponse],
)
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return DocumentService.get_documents(
        db,
        current_user.id,
    )


@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return DocumentService.get_document(
        db,
        document_id,
        current_user.id,
    )




@router.delete(
    "/{document_id}",
)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    success = DocumentService.delete_document(
        db,
        document_id,
        current_user.id,
    )

    return {

        "success": success

    }
    
@router.post(
    "/{document_id}/reindex",
    response_model=DocumentResponse,
)
def reindex_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = DocumentService.reindex_document(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )

    if document is None:

        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return document


@router.post(
    "/upload/txt",
    response_model=DocumentResponse,
)
def upload_txt(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user),

):

    try:
        return DocumentService.upload_txt(
            db=db,
            file=file,
            user_id=current_user.id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post(
    "/upload/docx",
    response_model=DocumentResponse,
)
def upload_docx(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return DocumentService.upload_docx(
            db=db,
            file=file,
            user_id=current_user.id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post(
    "/upload/markdown",
    response_model=DocumentResponse,
)
def upload_markdown(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user),

):

    try:
        return DocumentService.upload_markdown(
            db=db,
            file=file,
            user_id=current_user.id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post(
    "/upload/faq",
    response_model=DocumentResponse,
    )
def upload_faq(

        request: FAQUploadRequest,

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user),

    ):

        try:
            return DocumentService.upload_faq(
                db=db,
                request=request,
                user_id=current_user.id,
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        

        
        