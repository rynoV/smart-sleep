from http.server import BaseHTTPRequestHandler, HTTPServer
from json.encoder import JSONEncoder
from typing import Any

import server.api as api
from util.get_ip import get_ip


class Server(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body_bytes = self.rfile.read(content_length)
        api.routes[self.path](self, body_bytes.decode()).respond()

    def respond(self, success: bool, body: Any = ''):
        self.send_response(200 if success else 500)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        body = JSONEncoder().encode(body)
        self.wfile.write(bytes(body, encoding='utf8'))


ip = get_ip()
port = 8765
server = HTTPServer((ip, port), Server)
