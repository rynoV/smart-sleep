import document from 'document'
import { peerSocket } from 'messaging'
import { handlePSError } from '../shared/handlePSError'
import { sendMessage } from '../shared/sendMessage'
import { Accelerometer } from 'accelerometer'
import { abs, mean } from 'scientific'

function absMean(f32Array) {
    return mean(abs(f32Array))
}

function roundToNearestSecond(date) {
    date.setSeconds(date.getSeconds() + Math.round(date.getMilliseconds() / 1000), 0)
    return date
}

if (Accelerometer) {
    const freq = 30
    const accel = new Accelerometer({ frequency: freq, batch: freq })
    let prevSecond = -1
    accel.addEventListener('reading', () => {
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
            sendMessage(processed)
        }
    })
    accel.start()
}
const statusText = document.getElementById('status')
statusText.text = 'Sending to server...'

peerSocket.onopen = function () {
    // sendMessage('Hello server!')
}

peerSocket.onmessage = function (evt) {
    statusText.text = 'Server echo: ' + JSON.stringify(evt.data)
}

peerSocket.onerror = handlePSError
