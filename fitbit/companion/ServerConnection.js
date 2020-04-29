import { sendMessage } from '../common/sendMessage'
import { sleep } from '../common/sleep'
import { settingsKeys } from '../common/vars'
import { getSetting } from './settingsUtil'

export class ServerConnection {
    _websocket

    constructor() {
        this._websocket = new WebSocket(this._getUri())
        this._websocket.onclose = this._onClose
        this._websocket.onerror = this._onError
        this._websocket.onmessage = this._onMessage
        this._websocket.onopen = this._onOpen
    }

    async send(data) {
        try {
            let count = 0
            while (count <= 10) {
                if (this._websocket.readyState === this._websocket.OPEN) {
                    this._websocket.send(JSON.stringify(data))
                    return
                } else {
                    console.log('Retrying data send')
                    count++
                    await sleep(1000)
                }
            }
        } catch (error) {
            console.error(error)
        }
        console.warn('Could not send data')
    }

    _getUri() {
        let ip = getSetting(settingsKeys.ip)
        if (ip == null) {
            ip = '192.168.86.246:8765'
            console.log('Using default IP address: ', ip)
        } else {
            console.log('Using IP address from settings: ', ip)
        }
        return 'ws://' + ip
    }

    _onOpen(evt) {
        console.log('Websocket connected')
    }

    _onClose(evt) {
        console.warn('Websocket closed:', evt.code, evt.reason, evt.type, evt.data)
    }

    _onMessage(evt) {
        const { data } = evt
        console.log(`Websocket message: ${data}`)
        console.log('Sending to device...')
        sendMessage(data)
    }

    _onError(evt) {
        console.error('Websocket error:', evt.code, evt.reason, evt.type, evt.data)
    }
}
