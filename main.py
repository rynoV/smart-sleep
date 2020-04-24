import fitbit
import pprint
from datetime import date

if __name__ == "__main__":
    unauth_client = fitbit.Fitbit('22BDB9', '09365063c370154bc106a52ba7f23da9',
                                  access_token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkJEQjkiLCJzdWIiOiI3VlEzN1QiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTg3NzI4OTA3LCJpYXQiOjE1ODc3MDAxMDd9.zW4CtEcT9z5UGieGyE_7Ouo9RbPtlAPTasE9a81HJUo',
                                  refresh_token='63e8c08603a9f0ed30dd913f69dcea852074d657581ea0872e36b9d3205c4a26')
    # certain methods do not require user keys
    test = unauth_client.heart(date=date(2019, 11, 19))
    pprint.pprint(test)
