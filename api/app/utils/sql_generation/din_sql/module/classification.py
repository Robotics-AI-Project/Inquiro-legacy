from typing import Literal

from app.utils.llm import model
from app.utils.sql_generation.din_sql.utils import (
    classification_few_shot_prompt,
    get_database_fields,
    get_database_foreign_keys,
)
from app.utils.sql_generation.din_sql.utils.types import SqlClass


def __classification_prompt_maker(question, database, schema_links):
    fields = get_database_fields(database)
    foreign_keys = get_database_foreign_keys(database)
    prompt = f"""# For the given question, classify it as EASY, NON-NESTED, or NESTED based on nested queries and JOIN.
    if need nested queries: predict NESTED
    elif need JOIN and don't need nested queries: predict NON-NESTED
    elif don't need JOIN and don't need nested queries: predict EASY
    {fields}
    {foreign_keys}
    {classification_few_shot_prompt}
    Q: {question}
    schema_links: {schema_links}
    A: Let’s think step by step.
    """
    return prompt


def get_generation_class(question, database, schema_links) -> SqlClass:
    prompt = __classification_prompt_maker(question, database, schema_links)
    result = model.generate(prompt, stop=["Q:", "\\n\\n"])

    resultant_class = result.split("Label: ")[1].replace("\\", "").replace('"', "")
    return resultant_class
