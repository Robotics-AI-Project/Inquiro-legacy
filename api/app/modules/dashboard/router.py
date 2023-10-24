from fastapi import APIRouter

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)


@router.get("/")
async def root():
    return {"message": "hello"}
