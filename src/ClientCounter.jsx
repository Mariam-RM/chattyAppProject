import React, {Component} from 'react';

class ClientCounter extends Component {
  render(){
    return (
//returns count of current number of clients connected to the server
    <div className="clientCount">
      {this.props.count} users online
    </div>
    )
  }
}

export default ClientCounter