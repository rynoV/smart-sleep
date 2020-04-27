import asyncio
import websockets


async def hello():
    uri = "ws://192.168.86.246:8765"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello world!")
        test = await websocket.recv()
        print(test)

asyncio.get_event_loop().run_until_complete(hello())
