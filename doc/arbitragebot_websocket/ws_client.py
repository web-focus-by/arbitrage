import websockets
import asyncio
import time
import json
import base64
import hmac
import hashlib
from urllib import parse

HOST = '185.240.103.242'
PORT = 7890
BASE_URL = f'ws://{HOST}:{PORT}'

API_KEY = 'HtPp7SovE2cmzz4zMrZl57higrPI8k'
SECRET_KEY = 'ub1GRzMmgRTshzl8tYRBHdEblQcrFOMQhXUezz55KtFl1jH4avFuw9bDz82u'


def get_timestamp() -> int:
    return int(time.time() * 1000)


def gen_sign(url_path: str, params: dict, secret_key: str) -> str:
    str_to_sign = url_path
    if len(params) > 0:
        str_to_sign += '?' + parse.urlencode(params)
    signature = base64.b64encode(hmac.new(secret_key.encode('utf-8'), str_to_sign.encode('utf-8'), hashlib.sha256).digest()).decode()
    return signature


async def listen():
    url_path = "/spreads"

    params = {"timestamp": get_timestamp(),
              "key": API_KEY}
    params['signature'] = gen_sign(url_path, params, SECRET_KEY)

    async with websockets.connect(BASE_URL + url_path) as ws:
        await ws.send(json.dumps(params))
        while True:
            msg = await ws.recv()
            print(msg)


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(listen())
