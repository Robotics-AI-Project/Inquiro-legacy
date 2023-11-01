from typing import Dict, List

import openai

from ..model import LLMModel


class GPT4(LLMModel):
    name = "GPT-4"

    def generate(self, prompt: str | List[Dict[str, str]], *args, **kwargs) -> str:
        message = (
            [{"role": "user", "content": prompt}] if isinstance(prompt, str) else prompt
        )
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=message,
            n=1,
            stream=False,
            temperature=0.0,
            max_tokens=600,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            *args,
            **kwargs,
        )
        return response["choices"][0]["message"]["content"]
