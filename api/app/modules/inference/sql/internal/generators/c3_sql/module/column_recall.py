import json
import re
from typing import Dict, List

from app.database.port import Column, Table


def build_prompt(question: str, table_schemas: str, foreign_keys: str):
    base_prompt = f"""Given the database tables and question, perform the following actions:
1 - Rank the columns in each table based on the possibility of being used in the SQL, Column that matches more with the question words or the foreign key is highly relevant and must be placed ahead. You should output them in the order of the most relevant to the least relevant. Every column must be evaluated and no additional column should be added.
2 - Check whether you consider all the tables and all columns inside tables.
3 - Output a JSON object that contains all the columns in each table according to your explanation. The format should be like:
{{
"table_1": ["column_1", "column_2", ......], 
"table_2": ["column_1", "column_2", ......], 
"table_3": ["column_1", "column_2", ......], 
......
}}

Schema:
{table_schemas}
Foreign Keys:
{foreign_keys}

Question:
### {question}"""
    return base_prompt


def format_result(result: str) -> List[Table]:
    tables: Dict[str, List[str]] = json.loads(
        re.findall(r"\{.*\}", result.replace("\n", ""))[0]
    )

    formatted_tables = []

    for table in tables:
        tables[table] = tables[table][:5]
        formatted_tables.append(
            Table(
                name=table,
                columns=list(map(lambda x: Column(name=x, table=table), tables[table])),
            )
        )
    return formatted_tables
