from abc import ABC, abstractmethod

from ..llm.model import LLMModel


class Generator(ABC):
    name: str

    def __init__(self, model: LLMModel) -> None:
        super().__init__(model)

    @abstractmethod
    def generate(self, *args, **kwargs) -> str:
        pass
