from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from app.ai.embeddings.embedding_model import EmbeddingModel
from app.core.config import settings

class QdrantManager:
    @staticmethod
    def get_client():
        return QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )
        
    @staticmethod
    def get_vectorstore():
        embeddings = EmbeddingModel.get_embeddings()
        vectorstore = QdrantVectorStore.from_existing_collection(
            embedding=embeddings,
            collection_name=settings.QDRANT_COLLECTION,
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )
        return vectorstore
