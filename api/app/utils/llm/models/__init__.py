from app.utils.llm.models.codellama_14b import CodeLlama14B
from app.utils.llm.models.codellama_34b import CodeLlama34B
from app.utils.llm.models.gpt_4 import GPT4
from app.utils.llm.models.gpt_35_turbo import GPT35Turbo

models = [
    # OPEN AI
    GPT4,
    GPT35Turbo,
    # TOGETHER AI
    # CodeLlama
    CodeLlama14B,
    CodeLlama34B,
]
