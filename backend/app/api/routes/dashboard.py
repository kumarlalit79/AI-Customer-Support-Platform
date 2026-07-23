from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard-api",
    tags=["Dashboard"],
)


@router.get(
    "",
    response_model=DashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return DashboardService.get_dashboard(
        db=db,
        user_id=current_user.id,
    )
    
@router.get("/quick-stats")
def quick_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    dashboard = DashboardService.get_dashboard(
        db=db,
        user_id=current_user.id,
    )

    return {

        "documents": dashboard["total_documents"],

        "conversations": dashboard["total_conversations"],

        "messages": dashboard["total_messages"],

    }
    
@router.get("/recent-uploads")
def recent_uploads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    dashboard = DashboardService.get_dashboard(
        db=db,
        user_id=current_user.id,
    )

    return dashboard["recent_uploads"]

@router.get("/recent-conversations")
def recent_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    dashboard = DashboardService.get_dashboard(
        db=db,
        user_id=current_user.id,
    )

    return dashboard["recent_conversations"]

