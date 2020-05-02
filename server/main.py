from server.http_server import ip, port, server

if __name__ == "__main__":
    try:
        print(f"Server started http://{ip}:{port}")
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        print("Server stopped.")
