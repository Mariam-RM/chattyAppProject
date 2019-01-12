import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
//function to automatically scroll to bottom when message added to message container
  scrollToBottom = () => {
   this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render (){
    const messageArray = this.props.messages ;
    const messageItem = messageArray.map( message => {
      return <Message key ={Math.random()} messageData={message} />
    })

    return (
      <div>
        <span> {messageItem} </span>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }
}

export default MessageList;
