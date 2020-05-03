import sqlite3
from typing import Final

db_test_path: Final[str] = '../data/sqlite/testing.db'


def get_connection(db_path: str) -> sqlite3.Connection:
    connection = sqlite3.connect(db_path, detect_types=sqlite3.PARSE_DECLTYPES)
    connection.row_factory = sqlite3.Row
    return connection
