from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from app.ai.prompts.rewrite_query_prompt import REWRITE_QUERY_POMPT
from app.core.config import settings
from app.ai.llms.chat_model import ChatModel

class RewriteQueryNode:
    @staticmethod
    def execute(state):
        llm = ChatModel.get_llm()
        
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