from .model import LLMModel
from .models.codellama_14b import CodeLlama14B
from .models.codellama_34b import CodeLlama34B
from .models.gpt_4 import GPT4
from .models.gpt_35_turbo import GPT35Turbo

models = [
    CodeLlama14B,
    CodeLlama34B,
    GPT4,
    GPT35Turbo,
]
