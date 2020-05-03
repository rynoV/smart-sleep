import sqlite3
import unittest
from dataclasses import dataclass
from datetime import datetime
from typing import Iterable

from datasource import db_test_utils
from datasource.table import Table, T, Column


@dataclass
class TestingData:
    t: str
    d: datetime

    def __iter__(self):
        return iter((self.t, self.d))


class TestingTable(Table[TestingData]):
    _columns = [
        Column(name='t', type='text'),
        Column(name='d', type='timestamp'),
    ]
    name = 'testing'

    def __init__(self, db_path: str):
        super().__init__(db_path=db_path)

    def _get_columns(self) -> Iterable[Column]:
        return self._columns

    def _get_name(self) -> str:
        return self.name

    def _data_from_row(self, row: sqlite3.Row) -> T:
        return TestingData(*[row[column.name] for column in self._columns])


class TestTable(unittest.TestCase):
    db_path: str = db_test_utils.db_test_path
    connection: sqlite3.Connection = db_test_utils.get_connection(db_path)
    table: Table = TestingTable(db_path)

    def setUp(self) -> None:
        with self.connection:
            self.table.clear()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.connection.close()

    def test_insert(self):
        data = TestingData(t='test', d=datetime.now())
        self.table.insert(data)
        with self.connection:
            cur = self.connection.execute(f'select * from {self.table._get_name()}')
            for row in cur:
                self.assertEqual(data.t, row['t'])
                self.assertEqual(data.d, row['d'])

    def test_insert_many(self):
        data = [TestingData(t='test', d=datetime.now()), TestingData(t='test1', d=datetime.now().replace(year=2000))]
        self.table.insert_many(data)
        with self.connection:
            cur = self.connection.execute(f'select * from {self.table._get_name()}')
            for i, row in enumerate(cur):
                self.assertEqual(data[i].t, row['t'])
                self.assertEqual(data[i].d, row['d'])

    def test_get_data(self):
        data = [TestingData(t='test', d=datetime.now()), TestingData(t='test1', d=datetime.now().replace(year=2000))]
        self.table.insert_many(data)
        table_data = self.table.get_data()
        self.assertEqual(data, table_data)

    def test_clear(self):
        data = [TestingData(t='test', d=datetime.now()), TestingData(t='test1', d=datetime.now().replace(year=2000))]
        self.table.insert_many(data)
        self.table.clear()
        table_data = self.table.get_data()
        self.assertEqual([], table_data)
