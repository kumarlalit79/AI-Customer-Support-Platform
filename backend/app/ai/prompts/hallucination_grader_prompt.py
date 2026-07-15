from langchain_core.prompts import ChatPromptTemplate

HALLUCINATION_GRADER_PROMPT = ChatPromptTemplate.from_messages(
    [
        ("system", """ You are a hallucination detector.
         Determine whether the answer is completely supported by the provided context.
         Reply ONLY with
         
         yes

        or

        no

        Do not explain.
         """),
        (
            "human", """
                Context: 
                {context} 

                Answer:
                {answer}
            """
        )
    ]
)