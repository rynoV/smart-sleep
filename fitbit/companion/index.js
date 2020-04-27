import { peerSocket } from 'messaging'
import { handlePSError } from '../shared/handlePSError'
import { ServerConnection } from './ServerConnection'

const server = new ServerConnection()

peerSocket.onopen = function () {
  console.log('Device connected')
}

peerSocket.onmessage = function (evt) {
  const { data } = evt
  console.log('Message from device: ', data)
  console.log('Sending to server...')
  server.send(data)
}

peerSocket.onerror = handlePSError
