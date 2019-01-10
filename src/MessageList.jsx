import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render (){
    const messageArray = this.props.messages ;
    const messageItem = messageArray.map( message => {
      return <Message key ={Math.random()} messageData={message} />
    })

    return (
      <div>
        <span> {messageItem} </span>
       </div>
    )
  }
}



export default MessageList;
