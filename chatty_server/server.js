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

  const clientAddedObj = {
    type: 'clientUpdate',
    total: wss.clients.size,
    id: uuid()
  }

  wss.broadcastJSON(clientAddedObj)

  console.log("these are the clients added: ",clientAddedObj)




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
          console.log(`this is the user: ${objData.username} this is the type ${objData.type} this is the content ${objData.content}`);

        wss.broadcastJSON(messageObj)

        break;
      case "incomingNotification":

        const notificationObj = {
          type: objData.type,
          username: objData.username,
          content: `${objData.username} changed their name to ${objData.content}`,
          id: uuid()
        }

        console.log("this is the notification obj received by erver, ", notificationObj)
        // handle incoming notification

         wss.broadcastJSON(notificationObj)
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }


    // ws.send(JSON.stringify(sendObj))

    // console.log("whtas the data?: ", objData)

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

      const clientRemovedObj = {
        type: 'clientUpdate',
        total: wss.clients.size,
        id: uuid()
      }

      wss.broadcastJSON(clientRemovedObj)

      console.log("these are the clients added: ",clientRemovedObj)

  });


});