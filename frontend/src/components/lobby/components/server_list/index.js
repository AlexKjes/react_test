import React, {Component} from 'react';
import {Game} from'../../../../classes/game';

import "./index.css";
import io from 'socket.io-client';

export class ServerList extends Component {
  constructor(props){
    super(props);

    // bindings
    this.selectGameHandle = this.selectGame.bind(this);
    this.renderServersHandle = this.renderServers.bind(this);
    this.addServerHandle = this.addServerListener.bind(this);
    this.removeServerHandle = this.removeServerListener.bind(this);

    this.getServers();
    this.initSocketListeners();

    this.props.socket.emit('room', 'server-list');

    this.state = {
      servers: {}
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
          {this.renderServersHandle()}
        </tbody>
      </table>
    </div>
  }

  selectGame(game){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = ()=>{
      if (ajax.readyState === 4 && ajax.status === 200){
        this.props.setGame(game);
      } else if (ajax.state !== 200){
        // TODO error handling
      }
    }
    ajax.open('POST', 'http://localhost/api/server/join');
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify({game: {id: game.id}, user: this.props.user}));

  }

  initSocketListeners(){
    this.props.socket.on('add-server', this.addServerHandle);
    this.props.socket.on('rm-server', this.removeServerHandle);
  }

  // socket listeners
  addServerListener(server){
    this.state.servers[server.id] = server;
    this.setState(this.state);
  }
  removeServerListener(server){
    delete this.state.servers[server];
    this.setState(this.state);
  }

  componentWillUnmount() {
    this.props.socket.emit('leave', 'server-lsit');
  }

  getServers(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = ()=>{
      if (ajax.readyState === 4 && ajax.status === 200){
        var response = JSON.parse(ajax.responseText);
        var newState = Object.assign({}, this.state,
           {servers: response});
        this.setState(newState);
      }
    }
    ajax.open('GET', 'http://localhost/api/server');
    ajax.send();
  }

  renderServers(){
    var servers = [];
    for (var key in this.state.servers){
      var game = Object.assign(new Game(), this.state.servers[key]);
      servers.push(<ServerEntry key={key} game={game} selectGame={this.selectGameHandle}/>
    )}
    return servers;
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
