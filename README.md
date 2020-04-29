# Smart Sleep

An application to use data from a Fitbit device and machine learning to wake the
user up during REM sleep.

## Data

We will collect heart-rate and accelerometer data to use as input and use
Fitbit's sleep API for the labels.

### Retrospective Input

- Heart-rate data with 1 second granularity can be retrieved from the Fitbit
 API.
- Accelerometer data is not stored automatically, so each night during sleep we
will collect accelerometer data, store it (using the companion's local storage
most likely), and when the sleep is finished we will send the data to the
server and clear the local stored data.
    - We will collect the accelerometer data in batches with a certain number
    of readings each second and average the x, y, and z values for each second.

### Labels

- Fitbit's sleep API gives sleep stages data which we will use as labels. The
 different sleep stages it returns are `wake`, `light`, `deep`, and `rem`. It
  gives an array of objects each representing a portion of the sleep spent in
   a certain stage. For example:
```json5
[
  {
    "dateTime": "2020-04-27T22:47:00.000",
    "level": "wake",
    "seconds": 300
  },
  {
    "dateTime": "2020-04-27T22:52:00.000",
    "level": "light",
    "seconds": 1050
  },
  {
    "dateTime": "2020-04-27T23:09:30.000",
    "level": "deep",
    "seconds": 480
  },
  // ...
]
```
- It also gives `shortData` which contains `wake` sleep portions less than 3
 minutes in length. These will need to be merged into the rest of the data.

### Training

- We will gather all the heart and accelerometer data into our input matrix
(with their times lined up), and assign each item a sleep stage label based on
which sleep portion they fall in.
- We can retrain the model after each night.

### Evaluating

- A set period before the user's desired wake-up time, we will start sending
 heart and accelerometer data to the server which can then use the model to
  predict the sleep stage of the user and send off a signal to an alarm if
   the predicted sleep stage is `wake` or `rem`.

## Server-Fitbit Communication

The companion for the Fitbit communicates with the server via websockets. The
Fitbit application has an IP address setting whose value is used to construct
the server's websocket URI.

### Finding the Server's IP Address

The server will use the IP address of its host machine and print that to the
console. You can also find the IP address of the host machine using `ifconfig`
on Linux or `ipconfig` on Windows and looking for a `inet` or `IPv4 Address` IP
under a wifi interface if you're on wifi.

#### WSL2 IP Address

At the time of writing, when running the server on WSL2 (Windows Subsystem for
Linux 2) the IP of the host will not be accessible from other computers (namely
the phone running the Fitbit mobile app) due to the networking changes
introduced with WSL2. There are a few solutions:

- [This
  comment](https://github.com/microsoft/WSL/issues/4150#issuecomment-504209723)
  has a potential workaround
- Use WSL1
- Use Windows

### Ensuring Connection

I am assuming the server is on the same network as Fitbit mobile app when a
connection is attempted. If you are not on the same network additional steps may
be required. If you are on the same network and are having trouble connecting,
you may have to allow traffic on the server's port.
[Here](https://www.devopinion.com/access-localhost-from-another-computer-on-the-same-network/)
is a guide for doing that on Windows.
