from langchain_core.prompts import ChatPromptTemplate


HALLUCINATION_PROMPT = ChatPromptTemplate.from_messages(
    [

        (

            "system",

            """
            You are a hallucination evaluator.

            Determine whether the answer is fully supported by the retrieved context.

            Respond ONLY

            yes

            or

            no

            Nothing else.
            """

        ),

        (

            "human",

            """
            Context

            {context}

            Answer

            {answer}
            """

        )

    ]
)