from datetime import date, datetime
from json import JSONDecoder
from json.encoder import JSONEncoder
from typing import Iterable, Dict

from datasource.acc import AccData, AccTable, AccJSON
from server.request import ReqHandler


class AccReqHandler(ReqHandler[Iterable[AccData]]):
    _table = AccTable()

    def handle_body(self, body: str) -> Iterable[AccData]:
        self._backup_body(body)
        print('Parsing body...')
        try:
            return AccJSON.read(body)
        except Exception as e:
            print('Could not parse data', e)
            self._server.respond(success=False, body='Invalid data')
            raise e

    def respond(self):
        self._table.insert_many(self._body)
        self._server.respond(success=True)

    @staticmethod
    def _backup_body(body):
        backup_path = f'data/acc/raw-{date.today()}.json'
        with open(backup_path, 'w+') as backup_file:
            print('Backing up request body to:', backup_path)
            backup_str = backup_file.read()
            backup_data: Dict[str, str] = JSONDecoder().decode(backup_str) if backup_str != '' else {}
            backup_data[str(datetime.now())] = body
            backup_file.write(JSONEncoder().encode(backup_data))
