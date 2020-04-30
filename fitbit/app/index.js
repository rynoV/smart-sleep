import { peerSocket } from 'messaging'
import { me } from "appbit";
import { handlePSError } from '../common/handlePSError'
import { messages } from './peer'
import { statusText } from './ui'

me.appTimeoutEnabled = false

statusText.text = 'Starting...'

peerSocket.onopen = function () {
    // sendMessage('Hello server!')
}

peerSocket.onmessage = function (evt) {
    const { data: message } = evt
    new messages[message.type](message.data).respond()
}

peerSocket.onerror = handlePSError
