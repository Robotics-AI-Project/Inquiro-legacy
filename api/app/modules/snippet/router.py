from typing import Annotated

from app.dependencies.auth import get_user
from fastapi import APIRouter, Depends
from prisma.models import User

router = APIRouter(
    prefix="/snippet",
    tags=["snippet"],
)


@router.get("/")
async def root(user: Annotated[User, Depends(get_user)]):
    return {"message": user}
