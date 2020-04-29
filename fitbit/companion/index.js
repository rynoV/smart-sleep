import { peerSocket } from 'messaging'
import { handlePSError } from '../common/handlePSError'
import { ServerConnection } from './ServerConnection'
import { messages } from './peer'
import { settingsKeys } from '../common/vars'
import { sendMessage } from '../common/sendMessage'
import { getSetting } from './settingsUtil'

// const server = new ServerConnection()

peerSocket.onopen = function () {
    const wakeHour = parseInt(getSetting(settingsKeys.wakeHour))
    const wakeMin = parseInt(getSetting(settingsKeys.wakeMin))
    sendMessage('wakeInfo', { wakeHour, wakeMin })
}

peerSocket.onmessage = function (evt) {
    const { data: message } = evt
    new messages[message.type](message.data).respond()
}

peerSocket.onerror = handlePSError
