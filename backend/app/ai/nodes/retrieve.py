from app.ai.retrievers.qdrant_retriever import QdrantRetriever


class RetrieveNode:

    @staticmethod
    def execute(state):

        results = QdrantRetriever.retrieve_with_scores(
            state["question"]
        )

        documents = []
        scores = []

        for document, score in results:

            documents.append(document)

            scores.append(score)

        return {

            "context": documents,

            "retrieval_scores": scores,

        }