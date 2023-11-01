from typing import Dict, List

import openai

from ..model import LLMModel


class GPT35Turbo(LLMModel):
    name = "GPT-3.5-turbo"

    def generate(self, prompt: str | List[Dict[str, str]], *args, **kwargs) -> str:
        message = (
            [{"role": "user", "content": prompt}] if isinstance(prompt, str) else prompt
        )
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=message,
            n=1,
            stream=False,
            temperature=0.2,
            max_tokens=600,
            *args,
            **kwargs,
        )
        return response["choices"][0]["message"]["content"]
