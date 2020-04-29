import { Message } from '../common/peer'
import { AccDataCollector } from './AccDataCollector'

class WakeInfoMessage extends Message {
    parseData(data) {
        if (data.hasOwnProperty('wakeHour')
            && data.hasOwnProperty('wakeMin')
        ) {
            return {
                wakeHour: parseInt(data.wakeHour),
                wakeMin: parseInt(data.wakeMin),
            }
        } else {
            throw new Error(`Invalid data: ${data}`)
        }
    }

    respond() {
        new AccDataCollector(this._data.wakeHour, this._data.wakeMin).start().catch(reason => {
            console.log('Acc data collection stopped: ', reason)
        })
    }
}

export const messages = {
    wakeInfo: WakeInfoMessage
}
