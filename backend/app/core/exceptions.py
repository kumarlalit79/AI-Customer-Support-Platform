from fastapi import Request
from fastapi.responses import JSONResponse


class AIException(Exception):

    def __init__(
        self,
        message: str,
    ):

        self.message = message


async def ai_exception_handler(
    request: Request,
    exc: AIException,
):

    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": exc.message,
        },
    )