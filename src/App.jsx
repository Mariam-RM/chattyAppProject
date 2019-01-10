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
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   // const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type:"incomingMessage"};
    //   // const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   // this.setState({messages: messages})
    //   this.sendContent("Hello there General Kenobi!")
    // }, 3000);

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket')
      console.log("chat active")
      // this.socket.send("is this working?");
    };

    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket');
    };

    this.socket.onmessage = (payload) => {
      // const prsedPayload = JSON.parse(payload)
      console.log('Got message from server', payload);
      const msgJSON = JSON.parse(payload.data);
      console.log('parsed message from server', msgJSON);

      this.setState({
        // currentUser: {name: msgJSON.username},
        messages: [...this.state.messages, msgJSON]
      })


      switch (msgJSON.type) {
        case 'incomingMessage':
        case 'incomingNotification':
          this.setState({
            messages: [...this.state.messages, msgJSON]
          });
          break;
        case 'clientUpdate':
          this.setState({
            clients: msgJSON.total
          });
          // this.setState({ messages: json.messages });
            console.log("user changed added")
          break;
        default:
          console.log("error")
      }

      // this.setState({
      //   // currentUser: {name: msgJSON.username},
      //   messages: [...this.state.messages, msgJSON]
      // })

      // console.log("state: ", this.set)


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

  sendMsgToServer = (input, type) => {
    // e.preventDefault();
    const user = this.state.currentUser.name;
    // const {content} = messageContent;

    const objectToSend = {
      type: type,
      username: user,
      content: input
    }

    this.socket.send(JSON.stringify(objectToSend));
  }

   sendUser = (newUser, type) => {
    // e.preventDefault();
    const oldUser = this.state.currentUser.name;
    // const {content} = messageContent;

    const objectToSend = {
      type: type,
      username: oldUser,
      content: newUser
    }

    this.socket.send(JSON.stringify(objectToSend));
  }

  setUserState = (user) => {
    this.setState({
        currentUser: {name: user}
    })

    console.log("user set to: ", user)

  }


  // changeType = (target) => {

  //   let msgType = ""

  //   if (target === "chatMessage"){
  //     let msgType = "incomingMessage"
  //   } else if (target === "user"){
  //     let msgType = "incomingNotification"
  //   } else {
  //     console.log("error")
  //   }

  //   return msgType

  // }





}


  //  class ClientCount extends Component {
  //   <div className="clientCounter"> {this.state.clients} </div>
  // }




export default App;
