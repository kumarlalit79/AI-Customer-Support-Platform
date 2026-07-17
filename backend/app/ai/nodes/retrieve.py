from app.ai.retrievers.qdrant_retriever import QdrantRetriever


class RetrieveNode:

    @staticmethod
    def execute(state):
        results = QdrantRetriever.retrieve_with_scores(
            [state["question"]]
        )
        documents = []
        scores = []
        seen = set()
        for document, score in results:
            key = (
                document.metadata.get("document_id"),
                document.metadata.get("chunk_index"),
            )
            if key in seen:
                continue
            seen.add(key)
            documents.append(document)
            scores.append(score)
        return {
            "context": documents,
            "retrieval_scores": scores,
        }