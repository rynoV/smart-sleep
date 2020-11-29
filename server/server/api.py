from typing import Dict, Type

import server.acc_request as acc
import server.request

routes: Dict[str, Type[server.request.ReqHandler]] = {
    '/acc': acc.AccReqHandler
}
