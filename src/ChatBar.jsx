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

// changeType = (target) => {

  //   let msgType = ""

  //   if (target === "chatMessage"){
  //     let msgType = "incomingMessage"
  //   } else if (target === "user"){
  //     let msgType = "incomingNotification"
  //   } else {
  //     console.log("error")
  //   }

  //   return msgType

  // }



class ChatBar extends Component {

  render() {



  const handleUserEnter = (e) => {

    // const newUser = e.target.value
    // const currentU = this.props.currentUser

      if(e.key == 'Enter'){

        // if(e.target.value === ''){
        // //   setUserState('anonymous')
        // // } else {
        //    this.props.sendUser(e.target.value, "incomingMessage")

        //

        // }
          this.props.sendUser(e.target.value, "incomingNotification")

         this.props.setUserState(e.target.value)





      // this.props.sendUser(e.target.value, "incomingMessage")

      console.log("user before state updated", this.props.currentUser)

      // this.props.setUserState(e.target.value)





      console.log("user after state updated", this.props.currentUser)


      }


  }

  const handleMsgEnter = (e) => {


      if(e.key == 'Enter'){



        this.props.addMessage(e.target.value, "incomingMessage")


        console.log("current target", e.target.name)

        // this.props.captureUser(this.props.currentUser)



        e.target.value = "";

      }
  }

    // const handleInput = e => {
    //   // this.props.captureUser(this.props.currentUser)
    //   console.log("focusing")
    //   console.log("what?   ",e.target.parentElement.name)
    // }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="optional" onKeyPress={handleUserEnter} name="user" />
        <input className="chatbar-message" name="chatMessage" placeholder="Type a message and hit ENTER" onKeyPress={handleMsgEnter}/>
      </footer>
    )
  }
}

export default ChatBar;