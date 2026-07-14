from langgraph.graph import StateGraph, START, END
from app.ai.nodes.generate import GenerateNode
from app.ai.nodes.retrieve import RetrieveNode
from app.ai.nodes.grade_retrieval import GradeRetrievalNode
from app.ai.state import AgentState
from app.ai.nodes.rewrite_query import RewriteQueryNode

def retrieval_decision(state):

    if state["retrieval_ok"] == "yes":
        return "generate"
    
    if state["rewrite_count"] >= 2:
        return END

    return "rewrite_query"

builder = StateGraph(AgentState)
builder.add_node("retrieve", RetrieveNode.execute)
builder.add_node("generate", GenerateNode.execute)
builder.add_node("grade_retrieval",GradeRetrievalNode.execute)
builder.add_node("rewrite_query",RewriteQueryNode.execute)


builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "grade_retrieval")
builder.add_conditional_edges(
    "grade_retrieval", 
    retrieval_decision, 
    {
        "generate": "generate", 
        "rewrite_query": "rewrite_query",
        END: END
    }
)
builder.add_edge(
    "rewrite_query",
    "retrieve",
)

graph = builder.compile()