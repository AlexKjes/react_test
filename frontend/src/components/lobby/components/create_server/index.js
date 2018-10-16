import React, {Component} from 'react';
import './index.css';
import {Game} from'../../../../classes/game';


export class CreateServer extends Component {
  constructor(props){
    super(props);

    this.validateFormData = this.validateFormData.bind(this);
    this.getFormData = this.getFormData.bind(this);
  }

  render() {
    return <div>
      <h2>Lag nytt spill</h2>
      <hr/>
      <div className="form form-group">
        <div className="form-entry">
          <label>Servernavn</label>
          <br/>
          <input id ="server-name" type="text"/>
        </div>
        <div className="form-entry">
          <label>Størrelse</label>
          <br/>
          <select id="gameSize">
            <option value="small" defaultValue>Liten</option>
            <option value="medium">Medium</option>
            <option value="large">Stor</option>
          </select>
        </div>
        <div className="form-entry">
          <label>Antall lag</label>
          <br/>
          <select id="nTeams">
            <option value="2" defaultValue>2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="form-entry">
          <label>Antall spillere per lag</label>
          <br/>
          <select id="teamSize">
            <option value="1" defaultValue>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button className="btn btn-default" onClick={()=>this.buttonClick()}>Opprett</button>
      </div>
    </div>
  }

  buttonClick() {
    let game = this.getFormData();
    if (this.validateFormData(game)){
      this.props.setGame(game);
    }
  }

  validateFormData(data) {
    // TODO implement form validation
    return true;
  }

  getFormData() {
    let game = new Game();
    game.name = document.getElementById("server-name").value;
    let sb = document.getElementById("gameSize");
    game.size = sb.options[sb.selectedIndex].value;
    sb = document.getElementById("nTeams");
    game.nTeams = sb.options[sb.selectedIndex].value;
    sb = document.getElementById("teamSize");
    game.teamSize = sb.options[sb.selectedIndex].value;
    return game;
  }

}
