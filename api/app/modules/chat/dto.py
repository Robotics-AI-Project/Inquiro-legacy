from dataclasses import dataclass

from app.utils.types import Agent


@dataclass
class UpdateChatDTO:
    name: str | None = None


@dataclass
class CreateChatDTO:
    message: str
    agent: Agent
