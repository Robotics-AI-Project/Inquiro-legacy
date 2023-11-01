import ast
import re
from typing import List

from app.database.port import Database

from ..utils.formatter import format_table_schema


def build_prompt(question: str, database: Database):
    tables = database.tables()
    base_prompt = f"""Given the database schema and question, perform the following actions: 
1 - Rank all the tables based on the possibility of being used in the SQL according to the question from the most relevant to the least relevant, Table or its column that matches more with the question words is highly relevant and must be placed ahead.
2 - Check whether you consider all the tables. Do not remove any table out, if its not relevant then just note that it's not relevant and place near the end of the list.
3 - Output a list object in the order of step 2, Your output should contain all the tables. The format should be like: 
[
    "table_1", "table_2", ...
]

Schema:
{format_table_schema(tables)}

Question:
### {question}"""
    return base_prompt


def format_result(result: str) -> List[str]:
    return ast.literal_eval(re.findall(r"\[.*\]", result.replace("\n", ""))[0])[:5]
