import document from 'document'
import { peerSocket } from 'messaging'
import { handlePSError } from '../shared/handlePSError'
import { sendMessage } from '../shared/sendMessage'
import { Accelerometer } from "accelerometer";

if (Accelerometer) {
  // 30 readings per second, 60 readings per batch
  // the callback will be called once every two seconds
  const accel = new Accelerometer({ frequency: 30, batch: 60 });
  accel.addEventListener("reading", () => {
    for (let index = 0; index < accel.readings.timestamp.length; index++) {
      console.log(
          `Accelerometer Reading: \
          timestamp=${accel.readings.timestamp[index]}, \
          [${accel.readings.x[index]}, \
          ${accel.readings.y[index]}, \
          ${accel.readings.z[index]}]`
      );
    }
  })
  accel.start();
}

const statusText = document.getElementById('status')
statusText.text = 'Sending to server...'

peerSocket.onopen = function () {
  sendMessage('Hello server!')
}

peerSocket.onmessage = function (evt) {
  statusText.text = 'Server echo: ' + JSON.stringify(evt.data)
}

peerSocket.onerror = handlePSError
