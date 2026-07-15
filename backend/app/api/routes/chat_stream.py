from fastapi import APIRouter
from fastapi.responses import StreamingResponse

import asyncio

router = APIRouter(
    prefix="/chat",
    tags=["Streaming"],
)


@router.get("/stream")
async def stream():

    async def generate():

        text = (
            "Streaming endpoint is ready."
        )

        for token in text.split():

            yield token + " "

            await asyncio.sleep(
                0.05
            )

    return StreamingResponse(
        generate(),
        media_type="text/plain",
    )