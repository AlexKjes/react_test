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
            <input id="unamebox" type="text"/>
            <button onClick={this.btnClickHandle}>Ok</button>
          </div>
        </div>
      </div>
    </div>


  }

  btnClick(){
    var uname = document.getElementById('unamebox').value;

    var user = {name: uname, id: Math.floor(Math.random()*99999999999)};
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = ()=>{
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
        this.props.setUser(user);
      } else if (xmlHttp.readyState === 4){
        console.log("response form /user: " + xmlHttp.status);
      }
    }
    
    xmlHttp.open('POST', 'http://localhost/api/user');
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(user));


  }

}
