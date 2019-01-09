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



  const setUserState = (e) => {

    const newUser = this.props.captureUser(e.target.value)
  }

  const handleEnter = (e) => {


      if(e.key == 'Enter'){

        this.props.addMessage(e.target.value)
        console.log("current user", this.props.currentUser)

        e.target.value = "";

      }
  }

    return (
      <footer className="chatbar">
        <input className="chatbar-username"  placeholder="optional" onChange={setUserState} onBlur={setUserState} onMouseOver={setUserState} name="user" />
        <input className="chatbar-message" name="chatMessage" placeholder="Type a message and hit ENTER" onKeyPress={handleEnter}/>
      </footer>
    )
  }
}

export default ChatBar;