from fastapi import APIRouter

from .chat.router import router as chat_router
from .inference.router import router as inference_router
from .datasource.router import router as datasource_router
from .dashboard.router import router as dashboard_router
from .snippet.router import router as snippet_router

_routers = [
    chat_router,
    inference_router,
    datasource_router,
    dashboard_router,
    snippet_router,
]

api = APIRouter(prefix="/api")

for router in _routers:
    api.include_router(router)
