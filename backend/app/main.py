from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.auth import router as auth_router
from app.api.routes.health import router as health_router
from app.core.config import settings
from app.api.routes.document import router as document_router
from app.api.routes.chat import router as chat_router
from app.api.routes.conversation import router as conversation_router
from app.core.exceptions import AIException, ai_exception_handler
from app.api.routes.dashboard import (
    router as dashboard_router,
)

import socket

_original_getaddrinfo = socket.getaddrinfo

def _ipv6_first_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
    results = _original_getaddrinfo(host, port, family, type, proto, flags)
    return sorted(results, key=lambda r: r[0] != socket.AF_INET6)

socket.getaddrinfo = _ipv6_first_getaddrinfo

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(document_router)
app.include_router(chat_router)
app.include_router(conversation_router)
app.add_exception_handler(AIException, ai_exception_handler)
app.include_router(dashboard_router)