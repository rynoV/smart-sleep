import { peerSocket } from 'messaging'
import { handlePSError } from '../common/handlePSError'
import { ServerConnection } from './ServerConnection'
import { messages } from './peer'
import { settingsKeys } from '../common/vars'
import { sendMessage } from '../common/sendMessage'
import { getSetting } from './settingsUtil'

const server = new ServerConnection()

new messages.accFinish(true, server).respond().then(() => {
    console.log('Done')
}).catch(reason => {
    console.error(reason)
})

peerSocket.onopen = function () {
    const wakeHour = parseInt(getSetting(settingsKeys.wakeHour))
    const wakeMin = parseInt(getSetting(settingsKeys.wakeMin))
    sendMessage('wakeInfo', { wakeHour, wakeMin })
}

peerSocket.onmessage = async function (evt) {
    const { data: message } = evt
    console.log('MESSAGE: ', message.type, message.data)
    try {
        await new messages[message.type](message.data, server).respond()
    } catch (e) {
        console.error(e)
    }
}

peerSocket.onerror = handlePSError
