from typing import List

import together

from ..model import LLMModel


class CodeLlama14B(LLMModel):
    name = "CodeLlama-14b"

    def generate(self, prompt: str, *args, **kwargs) -> str:
        kwargs.setdefault("stop", ["Q:", "\n\n"])
        output = together.Complete.create(
            prompt=prompt,
            model="togethercomputer/CodeLlama-13b",
            max_tokens=512,
            temperature=0,
            top_k=60,
            top_p=0.6,
            *args,
            **kwargs,
        )
        return output["output"]["choices"][0]["text"]
