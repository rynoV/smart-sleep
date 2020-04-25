import document from "document";
import * as messaging from "messaging";
import { handleError } from '../shared/handleError';
import { sendMessage } from '../shared/sendMessage';

const statusText = document.getElementById("status");
statusText.text = "Testing...";

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
  // Ready to send or receive messages
  sendMessage()
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function (evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

// Listen for the onerror event
messaging.peerSocket.onerror = handleError


