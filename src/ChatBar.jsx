import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
//function that handles the username when enter key pressed and sets the state to new username
    const handleUserEnter = (e) => {
      if(e.key == 'Enter'){
        if(e.target.value === ''){
          this.props.sendUser('anonymous', "incomingNotification")
          this.props.setUserState('anonymous')
        } else {
          this.props.sendUser(e.target.value, "incomingNotification")
          this.props.setUserState(e.target.value)
        }
      }
    }
//function that handles the content entered in the message input field
    const handleMsgEnter = (e) => {
      if(e.key == 'Enter' && e.target.value !== ""){
        this.props.addMessage(e.target.value, "incomingMessage")

        e.target.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="optional" onKeyPress={handleUserEnter} name="user" />
        <input className="chatbar-message" name="chatMessage" placeholder="Type a message and hit ENTER" onKeyPress={handleMsgEnter}/>
      </footer>
    )
  }
}

export default ChatBar;