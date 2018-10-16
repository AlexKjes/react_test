import React, { Component } from 'react';

import './index.css';




export class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.btnClickHandle = this.btnClick.bind(this);
  }

  render(){
    return <div className="create-user-overlay">
      <div className="create-user-box-outer">
        <h2>Lag Bruker</h2>
        <div className="create-user-box-inner">
          <div className="create-user-input">
            <input type="text"/>
            <button onClick={this.btnClickHandle}>Ok</button>
          </div>
        </div>
      </div>
    </div>


  }

  btnClick(uname){
    var user = {name: uname, id: Math.floor(Math.random()*99999999999)};
    this.props.setUser(user);


  }

}
