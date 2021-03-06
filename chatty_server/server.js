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

  const chatStartObj = {
      type: 'clientUpdate',
      total: wss.clients.size,
      content: 'Chat now active - type away !',
      id: uuid()
    }

//send all clients a notification when they joined the chat that it is now active
   ws.send(JSON.stringify(chatStartObj))

//broadcast a notification to all clients whenever someone joins a chat
  if (wss.clients.size > 1){

    const clientAddedObj = {
      type: 'clientUpdate',
      total: wss.clients.size,
      content: 'A new user joined the chat - Welcome!',
      id: uuid()
    }

    wss.broadcastJSON(clientAddedObj)

  }

  ws.on('message', data => {
    const objData = JSON.parse(data)

    switch(objData.type) {
      case "incomingMessage":
        // handle incoming message

        const messageObj = {
          type: objData.type,
          username: objData.username,
          content: objData.content,
          id: uuid()
        }

        wss.broadcastJSON(messageObj)

        break;
      case "incomingNotification":
        // handle incoming notification

        const notificationObj = {
          type: objData.type,
          username: objData.username,
          content: `${objData.username} changed their name to ${objData.content}`,
          id: uuid()
        }

        // handle incoming notification

         wss.broadcastJSON(notificationObj)
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

      const clientRemovedObj = {
        type: 'clientUpdate',
        total: wss.clients.size,
        content: 'a user has left the chat',
        id: uuid()
      }

      wss.broadcastJSON(clientRemovedObj)
  });


});