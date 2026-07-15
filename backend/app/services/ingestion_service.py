from langchain_core.documents import Document

from app.ai.splitters.text_splitter import TextSplitter
from app.ai.vectorstores.qdrant_client import QdrantManager


class IngestionService:

    @staticmethod
    def ingest(
        documents: list[Document],
        document_id: int,
        filename: str,
    ):

        chunks = TextSplitter.split(
            documents
        )

        for index, chunk in enumerate(chunks):

            chunk.metadata["document_id"] = document_id

            chunk.metadata["filename"] = filename

            chunk.metadata["chunk_index"] = index

        QdrantManager.delete_document(
            document_id
        )

        QdrantManager.add_documents(
            chunks
        )