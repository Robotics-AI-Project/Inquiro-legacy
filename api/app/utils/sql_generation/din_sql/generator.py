from app.utils.sql_generation import Generator
from app.utils.sql_generation.din_sql.module import (
    get_generation_class,
    get_schema_links,
    get_sql,
)


class DINSQLGenerator(Generator):
    # def __init__(self, db_url: str):
    #     self.db_url = db_url

    def generate_sql(self, prompt: str) -> str:
        schema_links = get_schema_links(prompt, "")
        sql_class = get_generation_class(prompt, "", schema_links)
        sql = get_sql(prompt, sql_class)
        return sql_class
