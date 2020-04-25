import { peerSocket } from "messaging";

// Send a message to the peer
export function sendMessage() {
    // Sample data
    var data = {
        title: 'My test2 data',
        isTest: true,
        records: [1, 2, 3, 4]
    };
    if (peerSocket.readyState === peerSocket.OPEN) {
        // Send the data to peer as a message
        peerSocket.send(data);
    }
}
