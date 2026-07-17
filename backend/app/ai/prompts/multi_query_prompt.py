from langchain_core.prompts import ChatPromptTemplate


MULTI_QUERY_PROMPT = ChatPromptTemplate.from_template(
"""
You are an AI assistant.

Generate 3 different search queries that could retrieve
relevant information for answering the user's question.

Return ONLY the queries.

Question:

{question}
"""
)