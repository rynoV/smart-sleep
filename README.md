# Smart Sleep

An application to use data from a Fitbit device and machine learning to wake the
user up during REM sleep.

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
the phone runnning the Fitbit mobile app) due to the networking changes
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
