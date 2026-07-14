from app.ai.vectorstores.qdrant_client import QdrantManager

vectorstore = QdrantManager.get_vectorstore()

results = vectorstore.similarity_search(
    "What is Agentic AI?",
    k=3
)

for i, doc in enumerate(results, start=1):

    print("=" * 60)

    print(f"Result {i}")

    print(doc.page_content)

    print(doc.metadata)
