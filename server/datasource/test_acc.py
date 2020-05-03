import sqlite3
from datetime import datetime
from unittest import TestCase

from datasource import db_test_utils
from datasource.acc import AccTable, AccData


class TestAccTable(TestCase):
    db_path: str = db_test_utils.db_test_path
    connection: sqlite3.Connection = db_test_utils.get_connection(db_path)
    table: AccTable = AccTable(db_path)

    def setUp(self) -> None:
        with self.connection:
            self.table.clear()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.connection.close()

    def test__data_from_row(self):
        data = AccData(x=2, y=2, z=3, time=datetime.now())
        self.table.insert(data)
        row = self.connection.execute(f'select * from {self.table._get_name()}').fetchone()
        self.assertEqual(data, self.table._data_from_row(row))
