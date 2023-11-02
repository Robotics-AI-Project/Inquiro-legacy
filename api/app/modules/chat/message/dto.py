from dataclasses import dataclass

from app.utils.types import Agent


@dataclass
class CreateMessageDTO:
    content: str
    agent: Agent
