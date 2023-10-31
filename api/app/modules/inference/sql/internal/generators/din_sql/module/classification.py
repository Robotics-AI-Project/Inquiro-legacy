import re
from typing import List, Tuple, get_args

from ..utils import classification_few_shot_prompt
from ..utils.types import SQLClass


def build_prompt(
    table_infos: str,
    foreign_keys: str,
    question: str,
    schema_links: str,
):
    prompt = f"""# For the given question, classify it as EASY, NON-NESTED, or NESTED based on nested queries and JOIN.
    if need nested queries: predict NESTED
    elif need JOIN and don't need nested queries: predict NON-NESTED
    elif don't need JOIN and don't need nested queries: predict EASY
    {table_infos}
    {foreign_keys}
    {classification_few_shot_prompt}
    Q: {question}
    schema_links: {schema_links}
    A: Let’s think step by step.
    """
    return prompt


def _get_sub_questions(result):
    match = re.search(r"questions = \[([^\]]+)\]", result)
    if match:
        return match.group(1)
    return None


def format_result(result: str) -> Tuple[SQLClass, str | None]:
    if "Label: " not in result:
        raise ValueError(f"Invalid result, Label not found in result: {result}")
    label: SQLClass = (
        result.split("Label: ")[1].strip().replace("'", "").replace('"', "")
    )
    if label not in get_args(SQLClass):
        raise ValueError(f"Invalid label: {label}")
    if label == "NESTED":
        sub_questions = _get_sub_questions(result)
        if sub_questions is None:
            raise ValueError(
                f"Invalid result, sub_questions not found in result: {result}"
            )
        label = label, sub_questions
    return label, None
