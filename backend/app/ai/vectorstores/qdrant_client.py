from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from app.ai.embeddings.embedding_model import EmbeddingModel
from app.core.config import settings
from uuid import uuid4
from qdrant_client.models import Filter
from qdrant_client.models import FieldCondition
from qdrant_client.models import MatchValue

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

    @staticmethod
    def add_documents(chunks):
        vectorstore = QdrantManager.get_vectorstore()
        ids = []
        for chunk in chunks:
            ids.append(str(uuid4()))

        vectorstore.add_documents(
            documents=chunks,
            ids=ids,
        )
        return ids
    
    @staticmethod
    def delete_document(document_id: int):
        client = QdrantManager.get_client()
        client.delete(
            collection_name=settings.QDRANT_COLLECTION,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="metadata.document_id",
                        match=MatchValue(
                            value=document_id
                        ),
                    )
                ]
            )
        )