from pydantic import BaseModel

class FAQItem(BaseModel):
    question: str
    answer: str

class FAQUploadRequest(BaseModel):
    title: str
    faqs: list[FAQItem]