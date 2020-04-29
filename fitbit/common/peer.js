export class Message {
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