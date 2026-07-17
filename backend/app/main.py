from fastapi import FastAPI
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


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(document_router)
app.include_router(chat_router)
app.include_router(conversation_router)
app.add_exception_handler(AIException, ai_exception_handler)
app.include_router(dashboard_router)