import requests

if __name__ == '__main__':
    url = 'http://192.168.86.246:8765/acc'
    data = '[{"xy":1,"y":1,"z":1,"time":1}]'

    res = requests.post(url, json=data)
    print(res.encoding)
    print(res.text)
    print(res.ok)
