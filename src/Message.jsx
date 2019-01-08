import React, {Component} from 'react';

class Message extends Component {
  render() {

    const singleMessage = this.props.messageData.type === "incomingMessage" ? (<div className="message">
          <span className="message-username"> {this.props.messageData.username}</span>
          <span className="message-content">{this.props.messageData.content}</span>
       </div>) : (<div className="message system"> {this.props.messageData.content} </div>)

    return (
      <div>
       {singleMessage}
      </div>
    )
  }
}


export default Message;