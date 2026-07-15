from langchain_openai import ChatOpenAI
from app.core.config import settings

class ChatModel:
    _llm = None
    
    @classmethod
    def get_llm(cls):
        if cls._llm is None:
            cls._llm = ChatOpenAI(
                model=settings.OPENAI_MODEL,
                api_key=settings.OPENAI_API_KEY,
                base_url=settings.OPENAI_BASE_URL,
                temperature=0
            )
        return cls._llm