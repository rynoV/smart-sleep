import { Accelerometer } from 'accelerometer'

import { sendMessage } from '../common/sendMessage'
import { absMean, roundToNearestSecond } from './util'
import { sleep } from '../common/sleep'

export class AccDataCollector {
    static started = false

    constructor(wakeHour, wakeMin) {
        this.wakeHour = wakeHour
        this.wakeMin = wakeMin
    }

    /*
    * As the app starts, determine whether we should be collecting accelerometer data or not.
    * If we should be, start and continue until the designated wake up time.
    * If not, set a timeout that will finish at the time we should start collecting.
    */
    async start() {
        if (AccDataCollector.started === false) {
            AccDataCollector.started = true
        } else {
            return
        }
        while (true) {
            const now = new Date()
            const [collectStart, collectEnd] = this._getCollectPeriod(now)
            // const collectStart = new Date()
            // collectStart.setSeconds(collectStart.getSeconds())
            // const collectEnd = new Date()
            // collectEnd.setSeconds(collectEnd.getSeconds() + 10)
            console.log(`Acc data collection will occur from ${collectStart} to ${collectEnd}`)
            if (now > collectStart && now < collectEnd) {
                await this._collect(collectEnd)
            } else {
                const millisTilStart = collectStart - new Date()
                await sleep(millisTilStart, async () => await this._collect(collectEnd))
            }
        }
    }

    async _collect(collectEnd) {
        console.log('Starting accelerometer data collection')
        const stopper = this._begin_collection()
        const millisTilEnd = collectEnd - new Date()
        await sleep(millisTilEnd, () => {
            stopper()
            console.log('Stopping accelerometer data collection')
        })
    }

    _begin_collection() {
        if (Accelerometer) {
            const freq = 30
            const accel = new Accelerometer({ frequency: freq, batch: freq })
            const sendReading = this._sendReading(accel)
            accel.addEventListener('reading', sendReading)
            accel.start()
            return () => {
                accel.removeEventListener('reading', sendReading)
                accel.stop()
            }
        } else {
            throw new Error('Accelerometer not available')
        }
    }

    _sendReading(accel) {
        let prevSecond = -1
        return () => {
            const { x, y, z } = accel.readings
            const date = roundToNearestSecond(new Date())
            const currentSecond = date.getSeconds()
            if (prevSecond === -1 || prevSecond !== currentSecond) {
                prevSecond = currentSecond
                const processed = {
                    x: absMean(x),
                    y: absMean(y),
                    z: absMean(z),
                    time: date.getTime()
                }
                sendMessage('acc', processed)
            }
        }
    }

    /**
     * If now is past the user's wake time, we return a collection period for
     * the coming night, otherwise it is for the current night.
     *
     * @param {Date} now
     * @return {[Date, Date]} Two dates, the first representing the start of the
     * collection period and the second representing the end.
     */
    _getCollectPeriod(now) {
        const collectEnd = new Date()
        collectEnd.setHours(this.wakeHour, this.wakeMin, 0, 0)
        if (now > collectEnd) {
            collectEnd.setDate(collectEnd.getDate() + 1)
        }
        const collectStart = new Date(collectEnd)
        collectStart.setDate(collectStart.getDate() - 1)
        collectStart.setHours(22)
        return [collectStart, collectEnd]
    }
}