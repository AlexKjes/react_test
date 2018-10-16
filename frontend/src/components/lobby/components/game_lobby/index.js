import React, { Component } from 'react';

import './index.css';

export class GameLobby extends Component {
  render() {
    return <div>
      <h2>{this.props.game.name}</h2>
      <hr/>
      <div className="team-boxes">
        {this.renderTeams()}
      </div>
    </div>
  }

  renderTeams(){
    let ret = [];
    for (let i=0;i<this.props.game.teams.length;i++){
      ret.push(<TeamBox key={i} teamNum={i+1} members={this.props.game.teams[i]}/>)
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
