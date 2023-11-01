from typing import List

from app.database.port import ForeignKey, Table


def format_table_schema(tables: List[Table]):
    tables_formatted = ""
    for table in tables:
        columns_formatted = map(lambda c: c.name, table.columns)
        table_formatted = f"# {table.name} ( {', '.join(columns_formatted)} )\n"
        tables_formatted += table_formatted
    return tables_formatted[:-1]


def format_foreign_key_schema(foreign_keys: List[ForeignKey]):
    foreign_keys_formatted = ""
    for foreign_key in foreign_keys:
        foreign_keys_formatted += f"# {foreign_key.referenced_column.table}.{foreign_key.referenced_column.name} = {foreign_key.referencing_column.table}.{foreign_key.referencing_column.name}\n"
    return foreign_keys_formatted[:-1]
