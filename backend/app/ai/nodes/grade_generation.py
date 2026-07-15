from langchain_core.output_parsers import StrOutputParser
from app.ai.llms.chat_model import ChatModel
from app.ai.prompts.hallucination_grader_prompt import HALLUCINATION_GRADER_PROMPT

class GradeGenerationNode:
    @staticmethod
    def execute(state):
        llm = ChatModel.get_llm()
        chain = (HALLUCINATION_GRADER_PROMPT | llm | StrOutputParser())
        context = "\n\n".join(
            doc.page_content for doc in state['context']
        )
        
        result = chain.invoke(
            {
                "context": context,
                "answer": state["answer"]
            }
        )
        
        return {
            "hallucination_ok": result.strip().lower()
        }