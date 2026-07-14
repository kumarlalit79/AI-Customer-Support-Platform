from qdrant_client import QdrantClient
from qdrant_client.models import Distance
from qdrant_client.models import VectorParams
from app.ai.embeddings.embedding_model import EmbeddingModel
from app.core.config import settings

client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY,
    check_compatibility=False
)

embeddings = EmbeddingModel.get_embeddings()

dimension = len(embeddings.embed_query("hello"))
collections_response = client.get_collections()
collections = collections_response.collections

exists = any(
    collection.name == settings.QDRANT_COLLECTION for collection in collections
)

if not exists:
    client.create_collection(
        collection_name=settings.QDRANT_COLLECTION,
        vectors_config=VectorParams(size=dimension, distance=Distance.COSINE)
    )
    print("collection created")
else:
    print("Collection Already Exists")