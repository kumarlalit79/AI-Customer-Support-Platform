from pydantic import BaseModel


class KnowledgeStatisticsResponse(BaseModel):

    total_documents: int

    total_pdf: int

    total_txt: int

    total_docx: int

    total_markdown: int

    total_faq: int