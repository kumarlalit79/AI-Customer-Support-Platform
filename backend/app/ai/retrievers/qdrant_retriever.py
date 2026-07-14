from app.ai.vectorstores.qdrant_client import QdrantManager

class QdrantRetriever:
    @staticmethod
    def get_retriever():
        vectorstore = QdrantManager.get_vectorstore()
        retriever = vectorstore.as_retriever(
            search_type="mmr",
            search_kwargs={
                "k": 5,
                "fetch_k": 20
            }
        )
        return retriever