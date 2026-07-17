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
    
    @staticmethod
    def retrieve_with_scores(
        question: str,
        k: int = 5,
    ):
        vectorstore = QdrantManager.get_vectorstore()
        return vectorstore.similarity_search_with_score(
            question,
            k=k,
        )
        
    