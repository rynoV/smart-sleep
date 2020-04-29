import asyncio
import websockets
from get_ip import get_ip
from websocket.resolver import Resolver

if __name__ == "__main__":
    ip = get_ip()
    start_server = websockets.serve(Resolver(), ip, 8765)
    print('Serving on:', ip)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
