from pydantic import BaseModel

class DocumentResponse(BaseModel):
    id: int
    filename: str
    original_filename: str
    status: str
    
    class Config:
        from_attribute=True
        
    