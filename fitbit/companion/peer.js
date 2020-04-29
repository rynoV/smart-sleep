import { localStorage } from 'local-storage'

class Message {
    constructor(data) {
        this._data = this.parseData(data)
    }

    parseData(data) {
        throw new Error('Must implement parseData')
    }

    respond() {
        throw new Error('Must implement respond')
    }
}

class AccMessage extends Message {
    _lsKey = 'acc'

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
        const accDataStr = localStorage.getItem(this._lsKey) || ''
        const accData = accDataStr === '' ? [] : JSON.parse(accDataStr)
        accData.push(this._data)
        localStorage.setItem(this._lsKey, JSON.stringify(accData))
        localStorage.clear()
    }
}

export const messages = {
    acc: AccMessage
}