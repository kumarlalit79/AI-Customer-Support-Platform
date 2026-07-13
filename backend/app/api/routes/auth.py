from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post(
    "/register", 
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
    )
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        return AuthService.register(db, request)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
        
@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db:Session = Depends(get_db)):
    try:
        return AuthService.login(db, request)
    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )

@router.get("/me", response_model=UserResponse)    
def current_user(user: User = Depends(get_current_user)):
    return user