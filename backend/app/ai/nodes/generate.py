from langchain_core.output_parsers import StrOutputParser
from app.ai.prompts.rag_prompt import RAG_PROMPT
from app.ai.llms.chat_model import ChatModel

class GenerateNode:
    @staticmethod
    def execute(state):
        llm = ChatModel.get_llm()
        parser = StrOutputParser()
        chain = (RAG_PROMPT | llm | parser)
        context = "\n\n". join(doc.page_content for doc in state["context"])
        history = ""
        if "chat_history" in state:
            history = "\n".join(state["chat_history"])
        
        answer = chain.invoke({
            "question": state["question"],
            "context": context,
            "chat_history": history
        })
        unique_sources = {}

        for doc in state["context"]:
            filename = doc.metadata.get("filename", "")
            page = doc.metadata.get("page", 0)

            key = (filename, page)

            if key not in unique_sources:
                unique_sources[key] = {
                    "filename": filename,
                    "page": page,
                }

        sources = list(unique_sources.values())

        return {
            "answer" : answer,
            "sources" : sources,
            "confidence" : 1.0,
            "generation_count": state["generation_count"] + 1
        }