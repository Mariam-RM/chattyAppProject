import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageObj from './messages.json';
import ClientCounter from './ClientCounter.jsx'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "anonymous"},
      messages: [],
      clients : 0
    }

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (payload) => {
  //variable contianing parsed data recieved from server
      const msgJSON = JSON.parse(payload.data);
  //switch function to handle messages recieved by the server depending on their type
      switch (msgJSON.type) {
        case 'incomingMessage':
           this.setState({
            messages: [...this.state.messages, msgJSON]
          });

          break;
        case 'incomingNotification':
          this.setState({
            messages: [...this.state.messages, msgJSON]
          });

          break;
        case 'clientUpdate':
          this.setState({
            messages: [...this.state.messages, msgJSON],
            clients: msgJSON.total
          });

          break;
        default:
          console.log("error")
      }
    };
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <ClientCounter count={this.state.clients} />
      </nav>
      <main className="messages">
        <MessageList messages={this.state.messages} />
      </main>
        <ChatBar  sendUser={this.sendUser} setUserState = {this.setUserState} addMessage={this.sendMsgToServer}  currentUser={this.state.currentUser.name}/>
      </div>
    );
  }

//function to send message to server
  sendMsgToServer = (input, type) => {
    const user = this.state.currentUser.name;
    const objectToSend = {
      type: type,
      username: user,
      content: input
    }
    this.socket.send(JSON.stringify(objectToSend));
  }

//function to send user info to server
  sendUser = (newUser, type) => {
    const oldUser = this.state.currentUser.name;
    const objectToSend = {
      type: type,
      username: oldUser,
      content: newUser
    }
    this.socket.send(JSON.stringify(objectToSend));
  }

//function to update user state
  setUserState = (user) => {
    this.setState({
        currentUser: {name: user}
    })
  }
}

export default App;
