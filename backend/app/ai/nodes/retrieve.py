from app.ai.retrievers.qdrant_retriever import QdrantRetriever

class RetrieveNode:
    @staticmethod
    def execute(state):
        retriever = QdrantRetriever.get_retriever()
        documents = retriever.invoke(state["question"])
        return {
            "context": documents
        }