from app.utils.llm import model
from app.utils.sql_generation.din_sql.utils.types import SqlClass


def get_sql(prompt: str, sql_class: SqlClass) -> str:
    class_prompt = __get_prompt_from_class(prompt, sql_class)
    sql = model.generate(class_prompt, stop=["Q:", "\\n\\n"])
    return sql


def __get_prompt_from_class(prompt: str, sql_class: SqlClass) -> str:
    match sql_class:
        case "EASY":
            # TODO
            pass
        case "NESTED":
            # TODO
            pass
        case "NON-NESTED":
            # TODO
            pass
        case _:
            raise ValueError(f"Invalid sql_class: {sql_class}")
    return "SELECT COUNT(*) FROM SINGER"
