import { peerSocket } from 'messaging'
import { handlePSError } from '../shared/handlePSError'
import { ServerConnection } from './ServerConnection'
import { messages } from './peer'

const server = new ServerConnection()

peerSocket.onopen = function () {
    console.log('Device connected')
}

peerSocket.onmessage = function (evt) {
    const { data: message } = evt
    new messages[message.type](message.data).respond()
}

peerSocket.onerror = handlePSError
