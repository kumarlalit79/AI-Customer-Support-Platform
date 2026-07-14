from langchain_core.prompts import ChatPromptTemplate

RETRIEVAL_GRADER_PROMPT = ChatPromptTemplate.from_messages(
    [
        ("system", '''
                    You are a retrieval evaluator.
                    Your task is to determine whether the retrieved context is sufficient to answer the user's question.

                    If the context contains enough relevant information, respond with only: yes

                    Otherwise respond with only: no

                    Do not explain your reasoning.

         '''),
        (
            "human", """
                Question: {question}
                Retrieved Context: {context}
            """
        )
    ]
)