from app.database.port import Database, Table
from app.modules.inference.internal.generator.generator import Generator
from app.modules.inference.internal.llm.model import LLMModel
from app.modules.inference.sql.internal.generators.c3_sql.module import (
    column_recall,
    sql_generation,
    table_recall,
)
from app.modules.inference.sql.internal.generators.c3_sql.utils.formatter import (
    format_foreign_key_schema,
    format_table_schema,
)


class C3SQLGenerator(Generator):
    name = "C3-SQL"

    def __init__(self, model: LLMModel, database: Database) -> None:
        self.model = model
        self.database = database

    def __get_table_recall(self):
        prompt = table_recall.build_prompt(self.question, self.database)
        result = self.model.generate(prompt)
        print(result)
        formatted_result = table_recall.format_result(result)
        return formatted_result

    def __get_column_recall(self, table_schemas, foreign_keys):
        prompt = column_recall.build_prompt(self.question, table_schemas, foreign_keys)
        result = self.model.generate(prompt)
        print(result)
        formatted_result = column_recall.format_result(result)
        return formatted_result

    def __get_sql(self, table_schemas, foreign_keys):
        prompt = sql_generation.build_prompt(self.question, table_schemas, foreign_keys)
        result = self.model.generate(prompt)
        formatted_result = sql_generation.format_result(result)
        return formatted_result

    def generate(self, question: str, *args, **kwargs) -> str:
        self.question = question
        relevant_tables = self.__get_table_recall()
        relevant_tables_schema = format_table_schema(
            self.database.tables(relevant_tables)
        )
        foreign_key_schema = format_foreign_key_schema(
            self.database.foreign_keys(relevant_tables)
        )
        relevant_table_columns = self.__get_column_recall(
            relevant_tables_schema, foreign_key_schema
        )
        relevant_table_columns_schema = format_table_schema(relevant_table_columns)
        sql = self.__get_sql(relevant_table_columns_schema, foreign_key_schema)

        return sql
