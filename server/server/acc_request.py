from datetime import date
from json.encoder import JSONEncoder
from typing import Iterable, Any

from datasource.acc import AccData, AccTable
from server.request import ReqHandler


class AccReqHandler(ReqHandler[Iterable[AccData]]):
    _table = AccTable()

    def handle_body(self, body: Any) -> Iterable[AccData]:
        backup_path = f'data/acc/raw-{date.today()}.json'
        with open(backup_path, 'a') as outfile:
            print('Backing up acc data to:', backup_path)
            outfile.write(JSONEncoder().encode(self._body))
        print('Parsing: ', body)
        try:
            return [AccData(**item) for item in body]
        except Exception as e:
            print('Could not parse data', e)
            self._server.respond(success=False, body='Invalid data')
            raise e

    def respond(self):
        self._table.insert_many(self._body)
        self._server.respond(success=True)
