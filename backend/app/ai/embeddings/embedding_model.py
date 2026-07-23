from langchain_openai import OpenAIEmbeddings
from app.core.config import settings

class EmbeddingModel:
    @staticmethod
    def get_embeddings():
        embeddings = OpenAIEmbeddings(
            model=settings.OPENAI_EMBEDDING_MODEL,
            api_key=settings.OPENAI_API_KEY,
            base_url=settings.OPENAI_BASE_URL,
            timeout=30,
            max_retries=3,
        )
        return embeddings