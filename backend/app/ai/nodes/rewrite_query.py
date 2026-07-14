from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from app.ai.prompts.rewrite_query_prompt import REWRITE_QUERY_POMPT
from app.core.config import settings

class RewriteQueryNode:
    @staticmethod
    def execute(state):
        llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            api_key=settings.OPENAI_API_KEY,
            base_url=settings.OPENAI_BASE_URL,
            temperature=0,
        )
        
        chain = (REWRITE_QUERY_POMPT | llm | StrOutputParser())
        
        rewritten_question = chain.invoke(
            {
                "question": state["question"]
            }
        )
        return {
            "question": rewritten_question,
            "rewrite_count" : state["rewrite_count"] + 1
        }