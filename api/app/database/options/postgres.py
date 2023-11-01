from typing import List, Optional

import pandas as pd
from sqlalchemy import create_engine, inspect

from ..port import Column, Database, ForeignKey, Table


class Postgres(Database):
    name = "POSTGRES"

    def __init__(self, database_url: str) -> None:
        super().__init__(database_url)
        self.engine = create_engine(database_url)

    def _list_tables(self, *args, **kwargs) -> List[str]:
        inspector = inspect(self.engine)
        return inspector.get_table_names()

    def tables(self, tables: List[str] | None = None) -> List[Table]:
        inspector = inspect(self.engine)
        if tables is None:
            tables = self._list_tables()
        res = []
        for table in tables:
            columns = inspector.get_columns(table)
            res.append(
                Table(
                    name=table,
                    columns=map(lambda c: Column(name=c["name"], table=table), columns),
                )
            )
        return res

    def primary_keys(
        self, tables: List[str] | None = None, *args, **kwargs
    ) -> List[Column]:
        inspector = inspect(self.engine)
        pks = []
        for table in tables:
            pk = inspector.get_pk_constraint(table)
            pks.append(Column(table=table, name=pk["constrained_columns"][0]))
        return pks

    def foreign_keys(
        self, tables: Optional[List[str]] = None, *args, **kwargs
    ) -> List[ForeignKey]:
        if tables is None:
            tables = self._list_tables()
        inspector = inspect(self.engine)
        fks: List[ForeignKey] = []
        for table in tables:
            table_fks = inspector.get_foreign_keys(table)
            for fk in table_fks:
                if fk["referred_table"] not in tables:
                    continue
                fks.append(
                    ForeignKey(
                        constraint_id=fk["name"],
                        referenced_column=Column(
                            table=fk["referred_table"], name=fk["referred_columns"][0]
                        ),
                        referencing_column=Column(
                            table=table,
                            name=fk["constrained_columns"][0],
                        ),
                    )
                )
        return fks

    def execute_query(self, query: str, *args, **kwargs) -> pd.DataFrame:
        return pd.read_sql_query(query, self.engine)
