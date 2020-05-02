from typing import Dict, Type

from server.acc_request import AccReqHandler
from server.request import ReqHandler

routes: Dict[str, Type[ReqHandler]] = {
    '/acc': AccReqHandler
}
