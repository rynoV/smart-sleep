import sqlite3
from datetime import datetime
from json import JSONEncoder
from unittest import TestCase

from datasource import db_test_utils
from datasource.acc import AccTable, AccData, AccJSON


class TestAccTable(TestCase):
    db_path: str = db_test_utils.db_test_path
    connection: sqlite3.Connection = db_test_utils.get_connection(db_path)
    table: AccTable = AccTable(db_path)

    def setUp(self) -> None:
        self.table.clear()

    @classmethod
    def tearDownClass(cls) -> None:
        db_test_utils.tearDownClass(cls.table, cls.connection)

    def test__data_from_row(self):
        data = AccData(x=2, y=2, z=3, time=datetime.now())
        self.table.insert(data)
        rows = self.connection.execute(f'select * from {self.table._get_name()}').fetchall()
        self.assertEqual(1, len(rows))
        self.assertEqual([data], [self.table._data_from_row(row) for row in rows])


class TestAccJSON(TestCase):
    def test_read(self):
        data = [AccData(x=i * 1.7, y=i / 50, z=i ** (i * 0.3),
                        time=datetime.now().replace(year=2000 + i, microsecond=i * 30))
                for i in range(20)]
        dicts = [{**datum.__dict__} for datum in data]
        dicts = [{**dic, 'time': dic['time'].timestamp() * 1000.0} for dic in dicts]
        json = JSONEncoder().encode(dicts)
        self.assertEqual(data, AccJSON.read(json))
