# 🚀 Support AI Platform

> An agentic RAG-powered customer support platform that lets organizations build private AI assistants from their own knowledge base.

---

## 🔗 Demo

### 🎥 Demo Video

[![Watch Demo](https://img.youtube.com/vi/EXOKhftiq_A/maxresdefault.jpg)](https://youtu.be/EXOKhftiq_A)

---

## 📸 Screenshots

### Admin Dashboard

![Admin Dashboard](docs/dashboard.png)

### Knowledge Base

![Knowledge Base](docs/knowledge-base.png)

### Customer Chat

![Customer Chat](docs/customer-chat.png)

---

## 📋 Description

Support AI Platform is a full-stack AI customer support application that allows organizations to upload internal documents and instantly create a private AI assistant capable of answering customer questions.

Instead of relying only on an LLM, the platform uses an **Agentic Retrieval-Augmented Generation (RAG)** pipeline built with **LangGraph**, **Qdrant**, and **FastAPI** to retrieve relevant knowledge, rewrite poor queries, detect hallucinations, provide source citations, and maintain conversation history.

The platform includes separate **Admin** and **Customer** portals, making it closely resemble a real production AI SaaS.

---

## ⚙️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-black?style=for-the-badge)

### Backend

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-red?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

### AI Stack

![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge)
![LangGraph](https://img.shields.io/badge/LangGraph-blueviolet?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai)
![Qdrant](https://img.shields.io/badge/Qdrant-FF4F8B?style=for-the-badge)
![RAG](https://img.shields.io/badge/RAG-Agentic-green?style=for-the-badge)

---

## ✨ Features

### Authentication

- JWT authentication
- Role-based access for admins and customers
- Protected routes
- Persistent login

### Knowledge Base

- Upload PDF, TXT, DOCX, Markdown, and FAQ documents
- Delete documents
- Re-index documents
- Store vectorized chunks in Qdrant

### AI

- Agentic RAG workflow
- LangGraph orchestration
- Retrieval grading
- Query rewrite loop
- Hallucination detection
- Source citations
- Confidence score
- Conversation memory

### Dashboard

- Admin analytics
- Document statistics
- Recent uploads
- Recent conversations

### Customer Portal

- AI chat
- Conversation history
- Profile
- Role-based navigation

---

## 🧠 Agentic AI Pipeline

```mermaid
flowchart TD
    A[User question] --> B[Load conversation memory]
    B --> C[Attach previous messages]
    C --> D[Create LangGraph state]
    D --> E[Retrieve from Qdrant]
    E --> F[Top-k documents and similarity scores]
    F --> G[Remove duplicate chunks]
    G --> H[Build context and retrieval scores]
    H --> I{Retrieved documents relevant?}

    I -- Yes --> J[Generate answer]
    I -- No --> K[Rewrite query]
    K --> L[Increment rewrite count]
    L --> M{Rewrite attempts left?}
    M -- Yes --> E
    M -- No --> N[End with fallback response]

    J --> O[Generate source citations]
    O --> P[Calculate confidence score]
    P --> Q{Answer grounded in context?}
    Q -- Yes --> R[Save assistant message]
    Q -- No --> S[Generate again]
    S --> T{Generation attempts left?}
    T -- Yes --> J
    T -- No --> R
    R --> U[Return answer, confidence, citations, conversation ID]
```

---

## 🔄 How It Works

### Knowledge Ingestion

```mermaid
flowchart TD
    A[Admin] --> B[Upload document]
    B --> C[Extract text]
    C --> D[Chunk document]
    D --> E[Generate embeddings]
    E --> F[Store vectors in Qdrant]
    F --> G[Knowledge base ready]
```

### AI Question Answering

```mermaid
flowchart TD
    A[Customer question] --> B[Load conversation memory]
    B --> C[Retrieve documents]
    C --> D[Grade retrieval quality]
    D --> E{Relevant context?}
    E -- Yes --> F[Generate response]
    E -- No --> G[Rewrite query]
    G --> C
    F --> H[Run hallucination check]
    H --> I{Grounded answer?}
    I -- Yes --> J[Add source citations]
    I -- No --> F
    J --> K[Return final answer]
```

### End-to-End Flow

1. Admin uploads knowledge base documents.
2. Documents are parsed, chunked, embedded, and stored inside Qdrant.
3. Customer asks a question.
4. LangGraph retrieves the most relevant document chunks.
5. Retrieved context is graded for relevance.
6. If retrieval quality is poor, the query is rewritten automatically.
7. The LLM generates an answer using only retrieved context.
8. A hallucination checker validates the response.
9. Source citations and confidence score are returned.
10. Conversation history is saved for future chats.

---

## 🤖 AI Workflow

```mermaid
flowchart LR
    A[User question] --> B[Conversation memory]
    B --> C[Retrieve documents]
    C --> D{Retrieval relevant?}
    D -- Yes --> E[Generate answer]
    D -- No --> F[Rewrite query]
    F --> C
    E --> G{Hallucination check passed?}
    G -- Yes --> H[Save conversation]
    G -- No --> E
    H --> I[Frontend response]
```

---

## 📂 Project Structure

```text
Support-AI-Platform
├── backend
│   └── app
│       ├── ai
│       │   ├── embeddings
│       │   ├── graphs
│       │   ├── nodes
│       │   ├── prompts
│       │   ├── retrievers
│       │   ├── splitters
│       │   └── vectorstores
│       ├── api
│       ├── models
│       ├── schemas
│       ├── services
│       └── uploads
├── docs
│   ├── customer-chat.png
│   ├── dashboard.png
│   └── knowledge-base.png
├── frontend
│   └── src
│       ├── app
│       ├── components
│       ├── hooks
│       ├── lib
│       ├── services
│       ├── store
│       └── types
└── README.md
```

---

## 🏗️ Architecture

```mermaid
flowchart TD
    A[React frontend] --> B[FastAPI backend]
    B --> C[Authentication and API services]
    C --> D[LangGraph agent]
    D --> E[Qdrant vector database]
    D --> F[OpenAI]
    E --> D
    F --> D
    D --> B
    B --> A
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL
- Qdrant
- OpenAI API key

### Installation

#### Clone

```bash
git clone https://github.com/kumarlalit79/support-ai-platform.git
cd support-ai-platform
```

#### Backend

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key |
| `OPENAI_MODEL` | Chat model |
| `OPENAI_EMBEDDING_MODEL` | Embedding model |
| `OPENAI_BASE_URL` | OpenAI base URL |
| `JWT_SECRET_KEY` | JWT secret |
| `QDRANT_URL` | Qdrant URL |
| `QDRANT_API_KEY` | Qdrant API key |
| `QDRANT_COLLECTION_NAME` | Collection name |

### Frontend

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend API URL |

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint |
| --- | --- |
| `POST` | `/auth/register` |
| `POST` | `/auth/login` |
| `GET` | `/auth/me` |

### Knowledge Base

| Method | Endpoint |
| --- | --- |
| `POST` | `/documents/upload/pdf` |
| `POST` | `/documents/upload/txt` |
| `POST` | `/documents/upload/docx` |
| `POST` | `/documents/upload/markdown` |
| `POST` | `/documents/upload/faq` |
| `GET` | `/documents` |
| `DELETE` | `/documents/{id}` |
| `POST` | `/documents/{id}/reindex` |

### Chat

| Method | Endpoint |
| --- | --- |
| `POST` | `/chat` |

### Conversations

| Method | Endpoint |
| --- | --- |
| `GET` | `/conversations` |
| `PATCH` | `/conversations/{id}` |
| `DELETE` | `/conversations/{id}` |

### Dashboard

| Method | Endpoint |
| --- | --- |
| `GET` | `/dashboard-api` |
| `GET` | `/documents/statistics` |

---

## 🎯 Future Improvements

- Streaming responses
- Website chat widget
- Human agent handoff
- Multi-language support
- Analytics dashboard
- Feedback and rating system

---

## 👨‍💻 Author

**Lalit Kumar**

GitHub: <https://github.com/kumarlalit79>

---

## ⭐ If you found this project interesting, consider giving it a star!
