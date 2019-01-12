import React, {Component} from 'react';

class Message extends Component {
  render() {
    let singleMessage = (<h2> hello </h2>)

    //logic to return the correct <div> tag depending on the html to allow for correct rendering based on className
    if (this.props.messageData.type === "incomingMessage"){
      let singleMessage =(<div className="message">
        <span className="message-username"> {this.props.messageData.username}</span>
        <span className="message-content">{this.props.messageData.content}</span>
      </div>)
      return singleMessage
    } else if (this.props.messageData.type === "incomingNotification"){
      let singleMessage =(<div className="message system"> {this.props.messageData.content} </div>)
      return singleMessage
    } else {
      let singleMessage = (<div className="message system"> {this.props.messageData.content} </div>)
      return singleMessage
    }

    return (
       <div> {singleMessage} </div>
    )
  }
}

export default Message;