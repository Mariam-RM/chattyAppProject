import React, {Component} from 'react';


 class ClientCounter extends Component {
  render(){
    return (
    <div className="clientCount">
      {this.props.count} users online
    </div>
    )
  }

  }


export default ClientCounter