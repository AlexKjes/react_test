import React, {Component} from 'react';
import './index.css';
import { ServerList } from './components/server_list/';
import { CreateServer } from './components/create_server/';
import { GameLobby } from './components/game_lobby/';
import { CreateUser } from './components/createuser';

export class Lobby extends Component {
  constructor(props){
    super(props);

    this.state = {view: 0, user: null, game: null};

    this.changeViewHandle = this.changeView.bind(this);
    this.setGameHandle = this.setGame.bind(this);
    this.setUserHandle = this.setUser.bind(this);
  }

  render() {
    return <div className="lobby-main">
      {(!this.state.user)?<CreateUser setUser={this.setUserHandle}/>:""}
      <div className="lobby-menu">
        <LobbyMenu setParentView={this.changeViewHandle}/>
      </div>
      <div className="context-window">
        {this.getView()}
      </div>
    </div>
  }

  changeView(view){
    if (view === 2 && !this.state.game) { return  }
    var newState = Object.assign({}, this.state, {view: view});
    this.setState(newState);
  }

  setGame(game){
    var newState = {view: 2, game: game};
    if (game === undefined){
      newState.view = 0;
      newState.game = null;
    }
    this.setState(newState);
  }

  getView(){
      if (this.state.view === 0){
        return <ServerList setGame={this.setGameHandle}/>;
      } else if (this.state.view === 1){
        return <CreateServer setGame={this.setGameHandle}/>;
      } else if (this.state.view === 2){
        return <GameLobby game={this.state.game}/>;
      }
  }

  setUser(user){
    var newState = Object.assign({}, this.state, {user: user});
    this.setState(newState);
  }

}


class LobbyMenu extends Component {
  render() {
    return<div>
        <button className="btn btn-block btn-secondary" onClick={()=>this.props.setParentView(0)}>Finn Server</button>
        <button className="btn btn-block btn-secondary" onClick={()=>this.props.setParentView(1)}>Nytt Spill</button>
        <button className="btn btn-block btn-secondary" onClick={()=>this.props.setParentView(2)}>Mitt Spill</button>
    </div>
  }
}
