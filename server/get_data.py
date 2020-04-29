from datetime import date
from pprint import pprint
from dataclasses import dataclass
from typing import List

from fitbit import Fitbit

from gather_keys_oauth2 import OAuth2Server


@dataclass
class IntradayHeartDataItem:
    time: str
    value: int


@dataclass
class IntradayHeartData:
    dataset: List[IntradayHeartDataItem]
    datasetInterval: int
    datasetType: str


@dataclass
class HeartData:
    intraday_data: IntradayHeartData


if __name__ == '__main__':
    client_id = '22BDB9'
    client_secret = '09365063c370154bc106a52ba7f23da9'
    server = OAuth2Server(client_id=client_id, client_secret=client_secret)
    server.browser_authorize()

    profile = server.fitbit.user_profile_get()
    print('You are authorized to access data for the user: {}'.format(
        profile['user']['fullName']))

    print('TOKEN\n=====\n')

    token_items = server.fitbit.client.session.token
    client = Fitbit(client_id, client_secret,
                    access_token=token_items['access_token'],
                    refresh_token=token_items['refresh_token'])
    client.API_VERSION = 1.2
    data = client.intraday_time_series('activities/heart')
    sleep = client.get_sleep(date.today())
    pprint(sleep)
    # intra = data['activities-heart-intraday']['dataset']
    # pprint(intra)
