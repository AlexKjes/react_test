import React, { Component } from 'react';
import { Game } from '../../../../classes/game';
import { ChatBox } from '../chatbox';

import './index.css';

export class GameLobby extends Component {
  constructor(props){
    super(props);
    console.log(this.props.game);
    this.state = { game: null };

    this.props.socket.emit('room', 'game:'+this.props.game.id);
    this.props.socket.on('update', m=>{
      var newState = Object.assing({}, this.state, {game: m});
      this.setState(newState);
    });

    // TODO make function
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = ()=>{
      if (ajax.readyState === 4 && ajax.status === 200){
        var sj = JSON.parse(JSON.parse(ajax.responseText))
        var game = new Game();
        game = Object.assign(game, sj);
        console.log(game);
        this.setState({game: game});
      }
    }
    ajax.open('GET', 'http://localhost/api/server/'+this.props.game.id);
    ajax.send();
  }

  render() {
    return <div>
      <h2>{(this.state.game!== null)?this.state.game.name:""}</h2>
      <hr/>
      <div className="team-boxes">
        {(this.state.game)?this.renderTeams():""}
      </div>
      <ChatBox chatId={"game:"+this.props.game.id} socket={this.props.socket}
        user={this.props.user}/>
    </div>
  }

  renderTeams(){
    let ret = [];
    for (let i=0;i<this.state.game.teams.length;i++){
      ret.push(<TeamBox key={i} teamNum={i+1} members={this.state.game.teams[i]}/>)
    }
    return ret;
  }

}


class TeamBox extends Component {
  render() {
    return <div className="team-box-outer">
      <h3>Lag {this.props.teamNum}</h3>
      <div className="team-box-inner">{this.renderPlayers()}</div>
    </div>
  }

  renderPlayers() {
    let ret = [];
    for (let i=0;i<this.props.members.length;i++){
      ret.push(<TeamMember key={i} member={this.props.members[i]}/>);
    }
    return ret;
  }
}

class TeamMember extends Component {
  render() {
    return <div>{this.props.member.name}</div>
  }
}
