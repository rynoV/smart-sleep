import { peerSocket } from 'messaging'

export function sendMessage(type, data) {
    if (peerSocket.readyState === peerSocket.OPEN) {
        peerSocket.send({type, data})
    }
}
