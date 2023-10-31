from app.modules.inference.sql.router import router as sql_router
from fastapi import APIRouter

router = APIRouter(prefix="/inference")


router.include_router(sql_router)
