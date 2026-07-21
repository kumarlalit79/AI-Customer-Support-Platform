from pydantic import EmailStr, BaseModel, Field

class RegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    
class UserResponse(BaseModel):
    id: int
    full_name: str | None
    email: EmailStr
    is_active: bool
    role: str
    class Config:
        from_attributes=True