def build_prompt(
    table_infos: str, foreign_keys: str, primary_keys: str, question: str, sql: str
) -> str:
    instruction = """#### For the given question, use the provided tables, columns, foreign keys, and primary keys to fix the given SQLite SQL QUERY for any issues. If there are any problems, fix them. If there are no issues, return the SQLite SQL QUERY as is.
#### Use the following instructions for fixing the SQL QUERY:
1) Use the database values that are explicitly mentioned in the question.
2) Pay attention to the columns that are used for the JOIN by using the Foreign_keys.
3) Use DESC and DISTINCT when needed.
4) Pay attention to the columns that are used for the GROUP BY statement.
5) Pay attention to the columns that are used for the SELECT statement.
6) Only change the GROUP BY clause when necessary (Avoid redundant columns in GROUP BY).
7) Use GROUP BY on one column only."""
    prompt = f"""{instruction}
    
{table_infos}
{foreign_keys}
{primary_keys}
#### Question: {question}
#### SQLite SQL QUERY
{sql}
#### SQLite FIXED SQL QUERY
SELECT"""
    return prompt


def format_result(result: str) -> str:
    return "SELECT " + result.strip()
