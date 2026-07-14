from langgraph.graph import StateGraph, START, END
from app.ai.nodes.generate import GenerateNode
from app.ai.nodes.retrieve import RetrieveNode
from app.ai.state import AgentState

builder = StateGraph(AgentState)
builder.add_node("retrieve", RetrieveNode.execute)
builder.add_node("generate", GenerateNode.execute)

builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)

graph = builder.compile()