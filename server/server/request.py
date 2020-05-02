from abc import ABC, abstractmethod
from typing import Any, TypeVar, Generic

from server import http_server

T = TypeVar('T')


class ReqHandler(ABC, Generic[T]):
    _server: 'http_server.Server'
    _body: T

    def __init__(self, server: 'http_server.Server', body: Any = None):
        self._server = server
        self._body = self.handle_body(body)

    @abstractmethod
    def respond(self): ...

    @abstractmethod
    def handle_body(self, data: Any) -> T: ...


