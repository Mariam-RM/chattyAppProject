import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageObj from './messages.json';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "bobbi"},
      messages: []
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
        currentUser: {name: msgJSON.username},
        messages: [...this.state.messages, msgJSON]
      })

      // console.log("state: ", this.set)


      // switch (json.type) {
      //   case 'text-message':
      //     this.setState({
      //       messages: [...this.state.messages, json]
      //     });
      //     break;
      //   case 'initial-messages':
      //     this.setState({ messages: json.messages });
      //     break;
      //   default:
      // }
    };


  }

  render() {


    return (

      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <main className="messages">
        <MessageList messages={this.state.messages} />
      </main>

        <ChatBar currentUser={this.state.currentUser} captureUser = {this.captureUser} addMessage={this.sendContent}  currentUser={this.state.currentUser.name}/>

      </div>

    );
  }

  sendContent = (messageContent) => {
    // e.preventDefault();
    const user = this.state.currentUser.name;
    // const {content} = messageContent;

    const objectToSend = {
      username: user,
      content: messageContent
    }

    this.socket.send(JSON.stringify(objectToSend));
  }

  captureUser = (user) => {
    this.setState({
        currentUser: {name: user}
    })

    let newUser = this.state.currentUser.name;

    return newUser
  }





}



export default App;
