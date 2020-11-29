from datetime import datetime
from unittest import TestCase

from util.datetime import dt_from_millis


class Test(TestCase):
    def test_dt_from_millis(self):
        now = datetime.now()
        millis = now.timestamp() * 1000.0
        self.assertEqual(now, dt_from_millis(millis))
