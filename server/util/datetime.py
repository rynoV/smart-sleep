from datetime import datetime


def dt_from_millis(millis: float) -> datetime:
    return datetime.fromtimestamp(millis / 1000.0)
