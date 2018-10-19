import React, {Component} from 'react';
import './index.css';

export class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {messages: []};
    this.props.socket.emit('room', this.props.chatId);
    this.sendMessageHandle = this.sendMessage.bind(this);
    this.props.socket.on('message', (m)=>{
      if(m.user.id !== this.props.user.id){
        this.state.messages.push({userName: m.user.name, message: m.message});
        this.setState(this.state);
      }
    });

  }

  render(){
    return <div className="chatbox">
      <div className="message-display">
        {this.renderMessages()}
      </div>
      <div className="message-input">
        <span className="inputspan"><input id="chat-input" type="text"/></span>
        <span className="buttonspan"><button onClick={this.sendMessageHandle}>Send</button></span>
      </div>
    </div>
  }

  componentDidMount() {
    var msgBox = document.getElementsByClassName("message-display")[0];
  }

  sendMessage(){
    var txt = document.getElementById('chat-input').value;
    document.getElementById('chat-input').value = "";
    this.props.socket.emit('message', {room: this.props.chatId,
      user:this.props.user, message: txt});
    this.state.messages.push({userName: this.props.user.name, message: txt});
    this.setState(this.state);
  }

  renderMessages(){
    var ret = [];
    for (var i=this.state.messages.length-1;i>=0;i--){
      ret.push(<ChatMessage key={i} userName={this.state.messages[i].userName}
        message={this.state.messages[i].message}/>);
    }
    return ret;
  }
}


class ChatMessage extends Component {
  render(){
    return <div>
      <span>{this.props.userName}</span>: <span>{this.props.message}</span>
    </div>
  }
}
