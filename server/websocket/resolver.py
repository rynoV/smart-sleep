"""For resolving received messages"""
from json import JSONDecoder

import websockets

from websocket.api import Message, messages


class Resolver:
    async def __call__(self, websocket: websockets.WebSocketServerProtocol, path: str) -> None:
        async for message in websocket:
            self.parse_message(message).respond(websocket=websocket)

    @staticmethod
    def parse_message(message_str: str) -> Message:
        """Parses the message into the responder method and the message data

        :param message_str: A message received from a client
        :return: The Message instance corresponding to the message type
        """
        try:
            decoded = JSONDecoder().decode(message_str)
            return messages[decoded['type']](decoded['data'])
        except KeyError as e:
            raise e
