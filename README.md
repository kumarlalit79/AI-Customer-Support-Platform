# 🚀 Support AI Platform

> An Agentic RAG-powered customer support platform that enables organizations to build private AI assistants from their own knowledge base.

---

# 🔗 Demo

### 🎥 Demo Video
> Add Loom / YouTube Demo Link

### 🌐 Live Demo
> Add Live URL

---

## 📸 Screenshots

> Add screenshots here

### Admin Dashboard
![Admin Dashboard](docs/images/dashboard.png)

### Knowledge Base
![Knowledge Base](docs/images/knowledge-base.png)

### Customer Chat
![Customer Chat](docs/images/customer-chat.png)

---

# 📋 Description

Support AI Platform is a full-stack AI customer support application that allows organizations to upload their internal documents and instantly create a private AI assistant capable of answering customer questions.

Instead of relying only on an LLM, the platform uses an **Agentic Retrieval-Augmented Generation (RAG)** pipeline built with **LangGraph**, **Qdrant**, and **FastAPI** to retrieve relevant knowledge, rewrite poor queries, detect hallucinations, provide source citations, and maintain conversation history.

The platform includes separate **Admin** and **Customer** portals, making it closely resemble a real production AI SaaS.

---

# ⚙️ Tech Stack

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

# ✨ Features

### Authentication

- JWT Authentication
- Role-based Access (Admin & Customer)
- Protected Routes
- Persistent Login

### Knowledge Base

- Upload PDF
- Upload TXT
- Upload DOCX
- Upload Markdown
- Upload FAQ
- Delete Documents
- Re-index Documents

### AI

- Agentic RAG
- LangGraph Workflow
- Retrieval Grading
- Query Rewrite Loop
- Hallucination Detection
- Source Citations
- Confidence Score
- Conversation Memory

### Dashboard

- Admin Analytics
- Document Statistics
- Recent Uploads
- Recent Conversations

### Customer Portal

- AI Chat
- Conversation History
- Profile
- Role-Based Navigation

---

# 🧠 Agentic AI Pipeline

> **Architecture Diagram**

```
[ Add Agentic RAG Graph Here ]
```

Suggested image:

```
docs/images/agentic-rag-pipeline.png
```

---

# 🔄 How It Works

### Knowledge Ingestion

```
Admin
   │
   ▼
Upload Document
   │
   ▼
Extract Text
   │
   ▼
Chunk Document
   │
   ▼
Generate Embeddings
   │
   ▼
Store in Qdrant
   │
   ▼
Knowledge Base Ready
```

---

### AI Question Answering

```
Customer Question
        │
        ▼
Conversation Memory
        │
        ▼
Retrieve Documents
        │
        ▼
Retrieval Grading
        │
        ▼
Rewrite Query (if needed)
        │
        ▼
Generate Response
        │
        ▼
Hallucination Check
        │
        ▼
Source Citation
        │
        ▼
Final Answer
```

---

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

# 🤖 AI Workflow

```
User Question
      │
      ▼
Conversation Memory
      │
      ▼
Retrieve Documents
      │
      ▼
Retrieval Grading
      │
      ├───────────────┐
      │               │
   Relevant?         No
      │               │
      ▼               ▼
Generate        Rewrite Query
      │               │
      └───────┬───────┘
              ▼
      Hallucination Check
              │
      ┌───────┴────────┐
      │                │
     Yes              No
      │                │
      ▼                ▼
   Return         Generate Again
      │
      ▼
Save Conversation
      │
      ▼
Frontend Response
```

---

# 📂 Project Structure

```
Support-AI-Platform
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── store
│   │   ├── lib
│   │   └── types
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── ai
│   │   │   ├── graphs
│   │   │   ├── nodes
│   │   │   ├── prompts
│   │   │   ├── retrievers
│   │   │   ├── vectorstores
│   │   │   ├── embeddings
│   │   │   └── splitters
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── uploads
│
└── README.md
```

---

# 🏗️ Architecture

```
React Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
Authentication
        │
        ▼
LangGraph Agent
        │
        ▼
Qdrant Vector DB
        │
        ▼
OpenAI
```

---

# 🚀 Getting Started

## Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL
- Qdrant
- OpenAI API Key

---

## Installation

### Clone

```bash
git clone https://github.com/kumarlalit79/support-ai-platform.git

cd support-ai-platform
```

---

### Backend

```bash
cd backend

python -m venv myenv

myenv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Backend

| Variable | Description |
|-----------|-------------|
| DATABASE_URL | PostgreSQL Connection |
| OPENAI_API_KEY | OpenAI API Key |
| OPENAI_MODEL | Chat Model |
| OPENAI_EMBEDDING_MODEL | Embedding Model |
| OPENAI_BASE_URL | OpenAI Base URL |
| JWT_SECRET_KEY | JWT Secret |
| QDRANT_URL | Qdrant URL |
| QDRANT_API_KEY | Qdrant API Key |
| QDRANT_COLLECTION_NAME | Collection Name |

Frontend

| Variable | Description |
|-----------|-------------|
| VITE_API_URL | Backend API URL |

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /auth/register |
| POST | /auth/login |
| GET | /auth/me |

---

## Knowledge Base

| Method | Endpoint |
|----------|-----------------------------|
| POST | /documents/upload/pdf |
| POST | /documents/upload/txt |
| POST | /documents/upload/docx |
| POST | /documents/upload/markdown |
| POST | /documents/upload/faq |
| GET | /documents |
| DELETE | /documents/{id} |
| POST | /documents/{id}/reindex |

---

## Chat

| Method | Endpoint |
|----------|-------------|
| POST | /chat |

---

## Conversations

| Method | Endpoint |
|----------|----------------|
| GET | /conversations |
| PATCH | /conversations/{id} |
| DELETE | /conversations/{id} |

---

## Dashboard

| Method | Endpoint |
|----------|----------------|
| GET | /dashboard |
| GET | /documents/statistics |

---

# 🎯 Future Improvements

- Streaming Responses
- Website Chat Widget
- Human Agent Handoff
- Multi-language Support
- Analytics Dashboard
- Feedback & Rating System

---

# 👨‍💻 Author

**Lalit Kumar**

GitHub: https://github.com/kumarlalit79

LinkedIn: *(Add Profile)*

---

## ⭐ If you found this project interesting, consider giving it a star!