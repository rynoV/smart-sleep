import { peerSocket } from 'messaging'
import { handlePSError } from '../shared/handlePSError'
import { ServerConnection } from './ServerConnection'

const server = new ServerConnection()

peerSocket.onopen = function () {
    console.log('Device connected')
}

peerSocket.onmessage = function (evt) {
    const {data} = evt
    console.log('Message from device: ')
    const date = new Date(data.time)
    console.log(data.x, data.y, data.z, date.toString())
    // console.log(data.timestamp)
    // console.log(data.x)
    // data.timestamp.forEach((time) => console.log('TIME', time))
    // data.x.forEach((x) => console.log('X', x))
    // localStorage.clear()
    // const count = localStorage.getItem('count') || 0;
    // localStorage.setItem('count', count + 1);
    // console.log(localStorage.getItem('count'));
}

peerSocket.onerror = handlePSError
