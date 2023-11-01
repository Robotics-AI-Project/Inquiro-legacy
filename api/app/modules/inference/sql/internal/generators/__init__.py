from app.database import Database, databases
from app.modules.inference.internal.generator.generator import Generator
from app.modules.inference.internal.llm import LLMModel, models
from app.modules.inference.internal.llm.model import LLMModel
from app.modules.inference.sql.internal.generators.c3_sql import C3SQLGenerator
from app.modules.inference.sql.internal.generators.din_sql import DINSQLGenerator

generators = [DINSQLGenerator, C3SQLGenerator]


class SQLGenerator(Generator):
    __model_list = {m.name: m for m in models}
    __generator_list = {g.name: g for g in generators}
    __database_list = {d.name: d for d in databases}

    def __init__(
        self, model_name: str, generator_name: str, database: str, database_url: str
    ) -> None:
        self.model: LLMModel = self.__get_model(model_name)
        self.database: Database = self.__get_database(database, database_url)
        self.generator: Generator = self.__get_generator(generator_name)

    def __get_generator(self, generator_name: str) -> Generator:
        try:
            return self.__generator_list[generator_name](self.model, self.database)
        except KeyError:
            raise ValueError(
                f"Invalid generator name: {generator_name}, only available generators are: {', '.join(list(self.__generator_list.keys()))}"
            )

    def __get_model(self, model_name: str) -> LLMModel:
        try:
            return self.__model_list[model_name]()
        except KeyError:
            raise ValueError(
                f"Invalid model name: {model_name}, only available models are: {list(self.__model_list.keys())}"
            )

    def __get_database(self, database: str, database_url: str) -> Database:
        try:
            return self.__database_list[database](database_url)
        except KeyError:
            raise ValueError(
                f"Invalid database name: {database}, only available databases are: {list(self.__database_list.keys())}"
            )

    def generate(self, question: str, *args, **kwargs) -> str:
        return self.generator.generate(question, *args, **kwargs)
