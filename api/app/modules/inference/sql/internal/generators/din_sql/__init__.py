from app.database import Database
from app.modules.inference.internal.llm.model import LLMModel
from app.modules.inference.sql.internal.generators import Generator
from app.modules.inference.sql.internal.generators.din_sql.utils.helper import (
    extract_tables_from_schema_links,
)

from .module import classification, schema_linking, self_correction, sql_generation


class DINSQLGenerator(Generator):
    name = "DIN-SQL"

    def __init__(self, model: LLMModel, database: Database) -> None:
        self.model = model
        self.database = database

    def __get_schema_links(self) -> str:
        prompt = schema_linking.build_prompt(self.question, self.database)
        result = self.model.generate(prompt)
        formatted_result = schema_linking.format_result(result)
        return formatted_result

    def __get_sql_class(self, schema_links: str):
        prompt = classification.build_prompt(
            self.table_infos, self.foreign_keys, self.question, schema_links
        )
        result = self.model.generate(prompt)
        [formatted_result, sub_question] = classification.format_result(result)
        return formatted_result, sub_question

    def ___get_sql(
        self,
        schema_link: str,
        sql_class: str,
        sub_questions: str | None,
    ) -> str:
        prompt = sql_generation.build_prompt(
            self.table_infos, self.question, schema_link, sql_class, sub_questions
        )
        # result = self.model.generate(prompt)
        result = """For creating the SQL for the given question, we need to join these tables = [film, rental]. First, create an intermediate representation, then use it to construct the SQL query.
Intermediate_representation: select film.title from film where film.film_id = (select rental.inventory_id from rental group by rental.inventory_id order by count(*) desc limit 1)
SQL: SELECT title FROM film WHERE film_id = (SELECT inventory_id FROM rental GROUP BY inventory_id ORDER BY COUNT(*) DESC LIMIT 1)"""
        formatted_result = sql_generation.format_result(result, sql_class)
        return formatted_result

    def __get_self_correct(self, sql: str) -> str:
        prompt = self_correction.build_prompt(
            self.table_infos, self.foreign_keys, self.primary_keys, self.question, sql
        )
        result = self.model.generate(prompt)
        formatted_result = self_correction.format_result(result)
        return formatted_result

    def generate(self, question: str) -> str:
        self.question = question

        schema_links = self.__get_schema_links()

        tables = extract_tables_from_schema_links(schema_links)
        self.table_infos = self.database.get_table_infos_prompt(tables)
        self.primary_keys = self.database.get_primary_keys_prompt(tables)
        self.foreign_keys = self.database.get_foreign_keys_prompt(tables)

        sql_class, sub_question = self.__get_sql_class(schema_links)
        sql = self.___get_sql(schema_links, sql_class, sub_question)
        corrected_sql = self.__get_self_correct(sql)

        return corrected_sql
