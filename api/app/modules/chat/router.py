from typing import Annotated

from app.dependencies.auth import get_user
from app.modules.chat.dto import CreateChatDTO, UpdateChatDTO
from app.modules.chat.message import message_router
from app.utils import prisma
from fastapi import APIRouter, Depends, HTTPException
from prisma.models import Chat, User

router = APIRouter(prefix="/chat", tags=["chat"])
router.include_router(message_router)


@router.get("/", operation_id="get_all_chats")
async def get_all_chats(
    user: Annotated[User, Depends(get_user)], n: int = 10
) -> list[Chat]:
    try:
        chats = await prisma.chat.find_many(
            where={"userId": user.id},
            order={"createdAt": "desc"},
            take=n,
        )
        return chats
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get(
    "/{chat_id}", operation_id="get_chat_by_id", dependencies=[Depends(get_user)]
)
async def get_chat(chat_id: str) -> Chat:
    try:
        chat = await prisma.chat.find_unique(where={"id": chat_id})
        return chat
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/", operation_id="create_chat")
async def create_chat(
    body: CreateChatDTO, user: Annotated[User, Depends(get_user)]
) -> Chat:
    try:
        async with prisma.tx() as transaction:
            chat = await transaction.chat.create(
                data={"userId": user.id, "name": "Untitled Chat"}
            )
            await transaction.message.create(
                data={"chatId": chat.id, "content": body.message, "agent": body.agent}
            )
        return chat
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


@router.patch(
    "/{chat_id}", operation_id="update_chat_by_id", dependencies=[Depends(get_user)]
)
async def update_chat(chat_id: str, body: UpdateChatDTO) -> Chat:
    try:
        chat = await prisma.chat.update(where={"id": chat_id}, data={"name": body.name})
        return chat
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
