export class Message {
    /**
     * @param data
     * @param {ServerConnection} server
     */
    constructor(data, server=null) {
        this._data = this.parseData(data)
        this._server = server
    }

    parseData(data) {
        return data
    }

    async respond() {
        throw new Error('Must implement respond')
    }
}