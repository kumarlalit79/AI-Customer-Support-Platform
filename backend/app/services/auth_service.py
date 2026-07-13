from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password
)

from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest

class AuthService:
    @staticmethod
    def register(db: Session, user_data: RegisterRequest):
        existing_user = (
            db.query(User).filter(User.email == user_data.email).first()
        )
        
        if existing_user:
            raise ValueError("Email already registered")
        
        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            hashed_password=hash_password(user_data.password)
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def login(db: Session, credentials: LoginRequest):
        user = (
            db.query(User).filter(User.email == credentials.email).first()
        )
        
        if user is None:
            raise ValueError("Invalid email or password")
        
        if not verify_password(
            credentials.password,
            user.hashed_password
        ):
            raise ValueError("Invalid email or password")

        access_token = create_access_token({
            "sub": str(user.id)
        })
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }