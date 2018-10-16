import React, {Component} from 'react';
import {Game} from'../../../../classes/game';

import "./index.css";
import io from 'socket.io-client';

export class ServerList extends Component {
  constructor(props){
    super(props);

    this.selectGameHandle = this.selectGame.bind(this);

    const socket = io('http://localhost:5000/', {path: '/server-list'});
    socket.on('message', (msg)=>console.log(msg));


    this.state = {
      serverList: this.mockServers(50)
    }


  }

  render() {
    return <div className="server-list">
      <table>
        <thead>
          <tr>
            <th>Servernavn</th>
            <th>Spill størrelse</th>
            <th>Antall spillere</th>
          </tr>
        </thead>
        <tbody>
          {this.state.serverList}
        </tbody>
      </table>
    </div>
  }

  selectGame(game){
    this.props.setGame(game);
  }

  serverSocket(){

  }

  mockServers(n){
    let ret = [];
    let sizes = ["small", "medium", "large"];
    for (var i=0;i<n;i++){
      let game = new Game();
      game.nTeams = Math.floor(Math.random()*3+2);
      game.teamSize = Math.floor(Math.random()*3+1);
      game.size = sizes[Math.floor(Math.random()*3)];
      game.name = "server"+i;
      let nPlayers = Math.floor(Math.random()*(game.nTeams*game.teamSize-1));
      for (let j=0;j<nPlayers;j++){
        game.addPlayer({id: j, name:"player"+j});
      }
      ret.push(<ServerEntry key={i} game={game} selectGame={this.selectGameHandle}/>);
    }
    return ret;
  }
}


class ServerEntry extends Component {
  render() {
    let game = this.props.game;
    return <tr onClick={()=>{this.props.selectGame(game)}}>
      <td>{game.name}</td>
      <td>{game.size}</td>
      <td>{game.nPlayers}/{game.nTeams*game.teamSize}</td>
    </tr>
  }


}
