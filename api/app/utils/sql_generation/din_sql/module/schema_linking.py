from app.utils.sql_generation.din_sql.utils import (
    get_database_fields,
    get_database_foreign_keys,
    schema_linking_few_shot_prompt,
)


def get_schema_links(question, database):
    # model = get_model("GPT-4")
    prompt = schema_linking_prompt_maker(question, database)
    # full_schema_links_result = model.generate(prompt, stop=["Q:"])
    # schema_links = full_schema_links_result.split("Schema_links: ")[1]
    return prompt


def schema_linking_prompt_maker(question, database):
    instruction = "# Find the schema_links for generating SQL queries for each question based on the database schemas and Foreign keys."
    fields = get_database_fields(database)
    foreign_keys = get_database_foreign_keys(database)
    prompt = f"""{instruction}\n{schema_linking_few_shot_prompt}\n{fields}\n{foreign_keys}\nQ: "{question}"\nA: Let’s think step by step."""
    return prompt
