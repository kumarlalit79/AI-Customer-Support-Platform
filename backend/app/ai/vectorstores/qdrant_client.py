from uuid import uuid4
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.exceptions import UnexpectedResponse
from qdrant_client.models import Distance, VectorParams, Filter, FieldCondition, MatchValue, PayloadSchemaType
from app.ai.embeddings.embedding_model import EmbeddingModel
from app.core.config import settings

class QdrantManager:

    VECTOR_SIZE = 1536
        
    @staticmethod
    def get_client():
        return QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )
    
    @staticmethod
    def ensure_collection_exists():
        client = QdrantManager.get_client()

        collections = client.get_collections().collections
        collection_names = [c.name for c in collections]

        if settings.QDRANT_COLLECTION not in collection_names:

            print(f"Creating collection: {settings.QDRANT_COLLECTION}")

            client.create_collection(
                collection_name=settings.QDRANT_COLLECTION,
                vectors_config=VectorParams(
                    size=QdrantManager.VECTOR_SIZE,
                    distance=Distance.COSINE,
                ),
            )

            client.create_payload_index(
                collection_name=settings.QDRANT_COLLECTION,
                field_name="metadata.document_id",
                field_schema=PayloadSchemaType.INTEGER,
            )

            print("Qdrant collection created successfully.")
    
    
    @staticmethod
    def get_vectorstore():
        QdrantManager.ensure_collection_exists()
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
        ids = [str(uuid4()) for _ in chunks]
        vectorstore.add_documents(
            documents=chunks,
            ids=ids,
        )
        return ids
    
    @staticmethod
    def delete_document(document_id: int):
        QdrantManager.ensure_collection_exists()
        client = QdrantManager.get_client()
        try:
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
        except UnexpectedResponse:
            pass