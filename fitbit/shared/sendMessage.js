import { peerSocket } from 'messaging'

export function sendMessage(data) {
    if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send(data)
    }
}
