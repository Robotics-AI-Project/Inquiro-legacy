from app.dependencies.auth import get_user
from app.modules.chat.message.dto import CreateMessageDTO
from app.utils import prisma
from fastapi import APIRouter, Depends, HTTPException
from prisma.models import Message

router = APIRouter(
    prefix="/{chat_id}/message", tags=["message"], dependencies=[Depends(get_user)]
)


@router.get("/", operation_id="get_all_messages")
async def get_all_messages(chat_id: str) -> list[Message]:
    try:
        messages = await prisma.message.find_many(
            where={"chatId": chat_id}, order={"createdAt": "asc"}
        )
        return messages
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/", operation_id="create_message")
async def create_message(chat_id: str, body: CreateMessageDTO) -> Message:
    try:
        async with prisma.tx() as transaction:
            chat = await transaction.message.create(
                data={
                    "chatId": chat_id,
                    "content": body.content,
                    "agent": body.agent,
                }
            )
            await transaction.message.create(
                data={
                    "chatId": chat_id,
                    "content": body.content,
                    "agent": "CHATBOT" if body.agent == "USER" else "USER",
                }
            )

        return chat
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
