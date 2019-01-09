const WebSocket =require('ws');
const express = require('express');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', data => {
    const objData = JSON.parse(data)

    const messageObj = {
      type: "incomingMessage",
      username: objData.username,
      content: objData.content,
      id: uuid()
    }
    console.log(`User ${objData.username} said ${objData.content}`);

    wss.broadcastJSON(messageObj)
    // ws.send(JSON.stringify(sendObj))

    // console.log("whtas the data?: ", objData)

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});