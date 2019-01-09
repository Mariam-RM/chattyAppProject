import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageObj from './messages.json'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: messageObj.currentUser,
      messages: messageObj.messages
    }

  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      // const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type:"incomingMessage"};
      // const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      // this.setState({messages: messages})
      this.addMessage("Hello there General Kenobi!")
    }, 3000);
  }

  addMessage = (messageContent) => {



    const newMessage = {username: this.state.currentUser.name , content: messageContent, type:"incomingMessage", id: Math.random()};
    const messages = this.state.messages.concat(newMessage);



    this.setState({messages: messages})
  }


  render() {

    console.log(this.state)
    return (

<div>
<nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
</nav>
<main className="messages">
  <MessageList messages={this.state.messages} />
</main>

  <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>

</div>

    );
  }
}
export default App;
