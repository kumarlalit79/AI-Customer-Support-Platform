from langchain_core.prompts import ChatPromptTemplate

REWRITE_QUERY_POMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system", """ You improve user search queries.
            Rewrite the question so that a vector database has a better chance of retrieving relevant documents.
            Keep the meaning exactly the same.
            Return only the rewritten query.
            """
        ),
        (
            "human", "{question}"
        )
    ]
)