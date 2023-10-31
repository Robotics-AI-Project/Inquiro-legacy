import re

from app.database import Database

from ..utils import schema_linking_few_shot_prompt


def format_result(result: str) -> str:
    match = re.search(r"Schema_links: \[([^\]]+)\]", result)
    if match is None:
        raise ValueError(f"Invalid result, schema_links not found in result: {result}")
    return match.group(1)


def build_prompt(question: str, database: Database):
    instruction = "# Find the schema_links for generating SQL queries for each question based on the database schemas and Foreign keys."
    table_infos = database.get_table_infos_prompt()
    foreign_keys = database.get_foreign_keys_prompt()
    prompt = f"""{instruction}\n{schema_linking_few_shot_prompt}\n{table_infos}\n{foreign_keys}\nQ: "{question}"\nA: Let’s think step by step."""
    return prompt
