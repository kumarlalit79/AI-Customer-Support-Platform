from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from app.ai.prompts.rag_prompt import RAG_PROMPT
from app.ai.retrievers.qdrant_retriever import QdrantRetriever
from app.core.config import settings

class RAGChain:
    @staticmethod
    def get_chain():
        llm=ChatOpenAI(
            model=settings.OPENAI_MODEL,
            api_key=settings.OPENAI_API_KEY,
            base_url=settings.OPENAI_BASE_URL,
            temperature=0
        )
        retriever = QdrantRetriever.get_retriever()
        parser = StrOutputParser()
        return (
            {
                "context": retriever,
                "question": lambda x: x,
            }
            | RAG_PROMPT | llm | parser
        )