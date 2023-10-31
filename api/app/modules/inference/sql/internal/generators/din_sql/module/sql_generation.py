import re

from ..utils.prompt import (
    sql_generation_few_shot_prompt,
    sql_generation_medium_few_shot_prompt,
)
from ..utils.types import SQLClass


def build_prompt(
    table_infos: str,
    question: str,
    schema_link: str,
    sql_class: SQLClass,
    sub_questions: str | None,
) -> str:
    match sql_class:
        case "EASY":
            instruction = f"""# Use the the schema links to generate the SQL queries for each of the questions.\n\n{sql_generation_few_shot_prompt}\n\n{table_infos}
Q: {question}
Schema_links: {schema_link}
SQL:"""
            return instruction
        case "NON-NESTED":
            instruction = f"""# Use the the schema links and Intermediate_representation to generate the SQL queries for each of the questions.\n\n{sql_generation_medium_few_shot_prompt}\n\n{table_infos}
Q: {question}
Schema_links: {schema_link}
A: let's think step by step"""
            return instruction
        case "NESTED":
            instruction = f"""# Use the intermediate representation and the schema links to generate the SQL queries for each of the questions.\n\n{table_infos}
            Q: {question}
            Schema_links: {schema_link}
            A: Let's think step by step. "{question}" can be solved by knowing the answer to the following sub-question "{sub_questions}".
            """
    raise ValueError(f"Invalid sql_class: {sql_class}")


def format_result(result: str, sql_class: SQLClass) -> str:
    match sql_class:
        case "EASY":
            return result.strip()
        case "NON-NESTED" | "NESTED":
            match = re.search(r'SQL: ([^"]+)', result)
            if match is None:
                raise ValueError(f"Invalid result: {result}")
            return match.group(1).strip()

    raise ValueError(f"Invalid sql_class: {sql_class}")
