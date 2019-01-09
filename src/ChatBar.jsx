import React, {Component} from 'react';

// class NewMessage extends Component {
//   render(){
//     const onChange = (e) => {
//       const input = e.target.ele
//     }

//   }
// }

// function (){
//   const onEnter = (e) => {
//     this.props.addMessage(e.target.elements.chatMessage)
//   }
// }



class ChatBar extends Component {
  render() {

   const handleEnter = (e) => {
      if(e.key == 'Enter'){

        this.props.addMessage(e.target.value)

        e.target.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" name="chatMessage" placeholder="Type a message and hit ENTER" onKeyPress={handleEnter}/>
      </footer>
    )
  }
}

export default ChatBar;