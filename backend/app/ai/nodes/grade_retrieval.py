from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from app.ai.prompts.retrieval_grader_prompt import RETRIEVAL_GRADER_PROMPT
from app.core.config import settings

class GradeRetrievalNode:
    @staticmethod
    def execute(state):
        llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            api_key=settings.OPENAI_API_KEY,
            base_url=settings.OPENAI_BASE_URL,
            temperature=0
        )
        
        chain = (RETRIEVAL_GRADER_PROMPT | llm | StrOutputParser())
        context = "\n\n".join(doc.page_content for doc in state["context"])
        result = chain.invoke(
            {
                "question": state["question"],
                "context": context
            }
        )
        return {
            "retrieval_ok": result.strip().lower()
        }