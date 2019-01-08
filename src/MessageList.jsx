import React, {Component} from 'react';
import Message from './Message.jsx';
import messageArray from './messages.json';


class MessageList extends Component {
  render (){
    const messageItem = messageArray.map( message => {
      return <Message messageData={message} />
    })

    return (
      <div>
        <span> {messageItem} </span>
       </div>
    )
  }
}



export default MessageList;
