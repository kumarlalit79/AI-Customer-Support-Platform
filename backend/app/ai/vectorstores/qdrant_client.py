from uuid import uuid4
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.exceptions import UnexpectedResponse, ResponseHandlingException
from qdrant_client.models import Distance, VectorParams, Filter, FieldCondition, MatchValue, PayloadSchemaType
from app.ai.embeddings.embedding_model import EmbeddingModel
from app.core.config import settings
from tenacity import retry, stop_after_attempt, wait_fixed, retry_if_exception_type


class QdrantManager:

    VECTOR_SIZE = 1536
    _client = None
    _collection_ready = False
    _vectorstore = None

    @staticmethod
    def get_client():
        if QdrantManager._client is None:
            QdrantManager._client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY,
                timeout=30,
            )
        return QdrantManager._client

    @staticmethod
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_fixed(2),
        retry=retry_if_exception_type(ResponseHandlingException),
    )
    def _get_collections_with_retry(client):
        return client.get_collections().collections

    @staticmethod
    def ensure_collection_exists():
        # Only actually check with the server once per process.
        # Re-checking on every request was adding an extra network
        # round trip to every upload/delete, which is what was making
        # us time out more often on a slow/cold connection.
        if QdrantManager._collection_ready:
            return

        client = QdrantManager.get_client()

        collections = QdrantManager._get_collections_with_retry(client)
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

        QdrantManager._collection_ready = True

    @staticmethod
    def get_vectorstore():
        if QdrantManager._vectorstore is None:
            QdrantManager.ensure_collection_exists()
            embeddings = EmbeddingModel.get_embeddings()
            QdrantManager._vectorstore = QdrantVectorStore(
                client=QdrantManager.get_client(),
                collection_name=settings.QDRANT_COLLECTION,
                embedding=embeddings,
            )
        return QdrantManager._vectorstore

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