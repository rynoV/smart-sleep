import * as messaging from "messaging";
import { handleError } from '../shared/handleError';
import { sendMessage } from '../shared/sendMessage';

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
  sendMessage()
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function (evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

// Listen for the onerror event
messaging.peerSocket.onerror = handleError
