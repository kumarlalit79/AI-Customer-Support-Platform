from langgraph.graph import StateGraph, START, END
from app.ai.nodes.generate import GenerateNode
from app.ai.nodes.retrieve import RetrieveNode
from app.ai.nodes.grade_retrieval import GradeRetrievalNode
from app.ai.state import AgentState
from app.ai.nodes.rewrite_query import RewriteQueryNode
from app.ai.nodes.grade_generation import GradeGenerationNode

def retrieval_decision(state):

    if state["retrieval_ok"] == "yes":
        return "generate"
    
    if state["rewrite_count"] >= 2:
        return END

    return "rewrite_query"


def generation_decision(state):

    if state["hallucination_ok"] == "yes":
        return END

    if state["generation_count"] >= 2:
        return END

    return "generate"


builder = StateGraph(AgentState)
builder.add_node("retrieve", RetrieveNode.execute)
builder.add_node("grade_retrieval", GradeRetrievalNode.execute)
builder.add_node("rewrite_query", RewriteQueryNode.execute)
builder.add_node("generate", GenerateNode.execute)
builder.add_node("grade_generation", GradeGenerationNode.execute)

builder.add_edge(START, "retrieve")

builder.add_edge(
    "retrieve",
    "grade_retrieval",
)

builder.add_conditional_edges(
    "grade_retrieval",
    retrieval_decision,
    {
        "generate": "generate",
        "rewrite_query": "rewrite_query",
        END: END,
    },
)

builder.add_edge(
    "rewrite_query",
    "retrieve",
)

builder.add_edge(
    "generate",
    "grade_generation",
)

builder.add_conditional_edges(
    "grade_generation",
    generation_decision,
    {
        "generate": "generate",
        END: END,
    },
)


graph = builder.compile()