from langchain_core.documents import Document
from app.schemas.faq import FAQUploadRequest

class FAQLoader:

    @staticmethod
    def load(request: FAQUploadRequest):
        documents = []
        for index, faq in enumerate(request.faqs):
            documents.append(
                Document(
                    page_content=f"""
                    Question:
                    {faq.question}

                    Answer:
                    {faq.answer}
                    """.strip(),
                    metadata={
                        "page": index,
                        "source": request.title,
                    },
                )
            )
        return documents