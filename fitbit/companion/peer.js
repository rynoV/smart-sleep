import { localStorage } from 'local-storage'
import { Message } from '../common/peer'

const accLsKey = 'acc'

class AccMessage extends Message {
    parseData(data) {
        if (data.hasOwnProperty('x')
            && data.hasOwnProperty('y')
            && data.hasOwnProperty('z')
            && data.hasOwnProperty('time')
        ) {
            return data
        } else {
            throw new Error(`Invalid data: ${data}`)
        }
    }

    respond() {
        const accDataStr = localStorage.getItem(accLsKey) || ''
        const accData = accDataStr === '' ? [] : JSON.parse(accDataStr)
        accData.push(this._data)
        console.log('LS LENGTH: ', accData.length)
        localStorage.setItem(accLsKey, JSON.stringify(accData))
    }
}

class AccFinishMessage extends Message {
    async respond() {
        const accDataStr = localStorage.getItem(accLsKey) || ''
        if (accDataStr !== '' && this._server) {
            console.log('Sending acc data to server...')
            const res = await this._server.send(JSON.parse(accDataStr), this._server.routes.acc)
            const statusMessage = `${res.status}: ${res.statusText}`
            console.log(`Server responded with ${statusMessage}`)
            if (res.ok) {
                console.log(`Clearing acc data...`)
                // localStorage.setItem(accLsKey, JSON.stringify([]))
            } else {
                const body = await res.text()
                throw new Error(`Received status ${statusMessage} with body: ${body}`)
            }
        }
    }
}

export const messages = {
    acc: AccMessage,
    accFinish: AccFinishMessage
}
