import together

from ..model import LLMModel


class CodeLlama34B(LLMModel):
    name = "Llama-2-Chat-70b"

    def generate(self, prompt: str, *args, **kwargs) -> str:
        kwargs.setdefault("stop", ["Q:", "\n\n"])
        output = together.Complete.create(
            prompt=prompt,
            model="togethercomputer/llama-2-70b-chat",
            max_tokens=512,
            temperature=0.2,
            top_k=60,
            top_p=0.1,
            *args,
            **kwargs,
        )
        return output["output"]["choices"][0]["text"]
