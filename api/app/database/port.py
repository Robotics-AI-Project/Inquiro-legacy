from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional

import pandas as pd


@dataclass
class Column:
    table: str
    name: str


@dataclass
class ForeignKey:
    constraint_id: str
    referencing_column: Column
    referenced_column: Column


@dataclass
class Table:
    name: str
    columns: List[Column]


class Database(ABC):
    name: str

    def __init__(self, database_url: str) -> None:
        self.database_url = database_url

    def get_table_infos_prompt(self, tables: Optional[list[str]] = None):
        tables_formatted = ""
        for table in self.tables(tables):
            columns_formatted = map(lambda c: c.name, table.columns)
            table_formatted = (
                f"Table {table.name}, columns = [*, {','.join(columns_formatted)}]\n"
            )
            tables_formatted += table_formatted
        return tables_formatted

    def get_primary_keys_prompt(self, tables: Optional[List[str]] = None):
        pks = self.primary_keys(tables)
        pks_formatted = map(lambda x: f"{x.table}.{x.name}", pks)
        return f"Primary_keys = [{', '.join(pks_formatted)}]"

    def get_foreign_keys_prompt(self, tables: Optional[List[str]] = None):
        fks = self.foreign_keys(tables)
        fk_formatted = map(
            lambda x: f"{x.referenced_column.table}.{x.referencing_column.name} = {x.referencing_column.table}.{x.referencing_column.name}",
            fks,
        )
        return f"Foreign_keys = [{', '.join(fk_formatted)}]"

    @abstractmethod
    def _list_tables(self, *args, **kwargs) -> List[str]:
        pass

    @abstractmethod
    def tables(self, tables: Optional[List[str]]) -> List[Table]:
        pass

    @abstractmethod
    def primary_keys(
        self, tables: Optional[List[str]], *args, **kwargs
    ) -> List[Column]:
        pass

    @abstractmethod
    def foreign_keys(
        self, tables: Optional[List[str]] = None, *args, **kwargs
    ) -> List[ForeignKey]:
        pass

    @abstractmethod
    def execute_query(self, query: str, *args, **kwargs) -> pd.DataFrame:
        pass
