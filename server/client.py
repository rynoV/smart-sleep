import asyncio
import json

import websockets

from get_ip import get_ip


async def hello():
    uri = f'ws://{get_ip()}:8765'
    async with websockets.connect(uri) as websocket:
        message = {'type': 'acc', 'data': {'tmp': 'test'}}
        await websocket.send(json.dumps(message))
        # try:
        test = await websocket.recv()
        print(test)
        # except WebSocketException as e:
        #     print(type(e))
        #     print(e)


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(hello())
