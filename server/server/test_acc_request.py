from unittest import TestCase
from unittest.mock import Mock, patch

from server.acc_request import AccReqHandler
from server.http_server import Server


class TestAccReqHandler(TestCase):
    @patch('server.api')
    def test_handle_body_backs_up_body(self):
        mock_server = Mock(Server)
        handler = AccReqHandler(server=mock_server)
        handler._backup_body = Mock()
        handler.handle_body('')
        self.assertTrue(handler._backup_body.called)

    def test__parse_body(self):
        self.fail()

    def test_respond(self):
        self.fail()

    def test__backup_body(self):
        self.fail()

