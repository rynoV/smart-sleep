import sqlite3
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Final, Iterable, Sequence, Generic, TypeVar


@dataclass
class Column:
    """Represents a column in a table, providing the type and name of the column."""
    name: str
    type: str


T = TypeVar('T', bound=Iterable)


class Table(ABC, Generic[T]):
    """Provides a template for representing a database table."""
    _connection: sqlite3.Connection
    _insert_sql: Final[str]

    def __init__(self, db_path: str = 'data/sqlite/dev.db'):
        self._connection = sqlite3.connect(db_path, detect_types=sqlite3.PARSE_DECLTYPES)
        self._connection.row_factory = sqlite3.Row
        q_marks = ','.join('?' for c in self._get_columns())
        self._insert_sql = f'insert into {self._get_name()} values ({q_marks})'
        self._create_table()

    def get_data(self) -> List[T]:
        sql = f'select * from {self._get_name()}'
        cursor = self._connection.execute(sql)
        return [self._data_from_row(row) for row in cursor]

    def insert(self, data: T) -> None:
        with self._connection:
            self._connection.execute(self._insert_sql, Table._prepare_params(data))

    def insert_many(self, data: Iterable[T]) -> None:
        with self._connection:
            self._connection.executemany(self._insert_sql, [Table._prepare_params(item) for item in acc_data])

    @abstractmethod
    def _get_columns(self) -> Iterable[Column]: ...

    @abstractmethod
    def _get_name(self) -> str: ...

    @abstractmethod
    def _data_from_row(self, row: sqlite3.Row) -> T: ...

    @staticmethod
    def _prepare_params(data: T) -> Sequence:
        return tuple(data)

    def _create_table(self) -> None:
        column_decs = ' ,'.join([f'{column.name} {column.type}' for column in self._get_columns()])
        sql = f'create table if not exists {self._get_name()}({column_decs})'
        self._connection.execute(sql)

    def __del__(self):
        self._connection.close()
