import { settingsKeys } from '../common/vars'
import { getSetting } from './settingsUtil'

export class ServerConnection {
    routes = {
        acc: 'acc'
    }
    _url

    constructor() {
        this._url = this._getUrl()
    }

    /**
     * Send JSON encoded data to the server in a POST request and return the response.
     *
     * @param {object} data The data to send to the server
     * @param {string} route A postfix to apply to the base URL given by `ServerConnection.routes`
     * @return {Promise<Response>} The response from the server
     */
    async send(data, route) {
        return await fetch(this._url + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    _getUrl() {
        let ip = getSetting(settingsKeys.ip)
        if (ip == null) {
            ip = '192.168.86.246:8765'
            console.log('Using default IP address: ', ip)
        } else {
            console.log('Using IP address from settings: ', ip)
        }
        return 'http://' + ip + '/'
    }
}
