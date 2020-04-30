from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, Type, TypeVar, Generic, List

import http_server

T = TypeVar('T')


class ReqHandler(ABC, Generic[T]):
    _server: 'http_server.Server'
    _body: Any

    def __init__(self, server: 'http_server.Server', body: Any = None):
        self._server = server
        self._body = self.parse_body(body)

    @abstractmethod
    def respond(self): ...

    @abstractmethod
    def parse_body(self, data: Any) -> T: ...


@dataclass
class AccData:
    x: int
    y: int
    z: int
    time: int


class AccReqHandler(ReqHandler[List[AccData]]):
    def parse_body(self, body: Any) -> List[AccData]:
        print('Parsing: ', body)
        try:
            return [AccData(**item) for item in body]
        except Exception as e:
            print('Could not parse data', e)
            self._server.respond(success=False, body='Invalid data')
            raise e

    def respond(self):
        print(self._body)
        self._server.respond(success=True)


routes: Dict[str, Type[ReqHandler]] = {
    '/acc': AccReqHandler
}
