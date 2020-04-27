import document from 'document'
import { peerSocket } from 'messaging'
import { handlePSError } from '../shared/handlePSError'
import { sendMessage } from '../shared/sendMessage'

const statusText = document.getElementById('status')
statusText.text = 'Sending to server...'

peerSocket.onopen = function () {
  sendMessage('Hello server!')
}

peerSocket.onmessage = function (evt) {
  statusText.text = 'Server echo: ' + JSON.stringify(evt.data)
}

peerSocket.onerror = handlePSError
