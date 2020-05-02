import sqlite3
from dataclasses import dataclass
from datetime import datetime
from json import JSONDecoder
from typing import Iterable, Final, List, Dict

from datasource.table import Table, Column
from util.datetime import dt_from_millis


@dataclass
class AccData(Iterable):
    x: float
    y: float
    z: float
    time: datetime

    def __iter__(self):
        return iter((self.x, self.y, self.z, self.time))


class AccTable(Table[AccData]):
    _name: Final[str] = 'acc'
    _columns: Final[List[Column]] = [
        Column(name='x', type='real'),
        Column(name='y', type='real'),
        Column(name='z', type='real'),
        # Specifying `timestamp` tells sqlite3 to take care of date type conversions with PARSE_DECLTYPES enabled
        Column(name='time', type='timestamp'),
    ]

    def _get_columns(self) -> Iterable[Column]:
        return self._columns

    def _get_name(self) -> str:
        return self._name

    def _data_from_row(self, row: sqlite3.Row) -> AccData:
        return AccData(*[row[column.name] for column in self._columns])


class AccJSON:
    @staticmethod
    def read(json: str) -> List[AccData]:
        """Parses a JSON string containing an array of AccData-like objects."""
        decoded: List[Dict[str, int]] = JSONDecoder().decode(json)
        data = [{**item, 'time': dt_from_millis(item['time'])} for item in decoded]
        return [AccData(**item) for item in data]
