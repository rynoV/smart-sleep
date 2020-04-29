import document from 'document'
import { peerSocket } from 'messaging'
import { handlePSError } from '../common/handlePSError'
import { messages } from './peer'

const statusText = document.getElementById('status')
statusText.text = 'Sending to server...'

peerSocket.onopen = function () {
    // sendMessage('Hello server!')
}

peerSocket.onmessage = function (evt) {
    const { data: message } = evt
    new messages[message.type](message.data).respond()
}

peerSocket.onerror = handlePSError
