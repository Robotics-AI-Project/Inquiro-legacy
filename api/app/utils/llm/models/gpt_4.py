import openai
from app.utils.llm import LLMModel


class GPT4(LLMModel):
    name = "GPT-4"

    def generate(self, prompt: str, *args, **kwargs) -> str:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
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
