from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, Type, TypeVar, Generic

T = TypeVar('T')


class Message(ABC, Generic[T]):
    def __init__(self, data: Any):
        self.data = self.parse_data(data)

    @abstractmethod
    def respond(self, websocket=None): ...

    @abstractmethod
    def parse_data(self, data: Any) -> T: ...


@dataclass
class AccData:
    tmp: str


class AccMessage(Message[AccData]):
    def parse_data(self, data: Any) -> AccData:
        return AccData(**data)

    def respond(self, websocket=None):
        print(self.data)


messages: Dict[str, Type[Message]] = {
    'acc': AccMessage
}
