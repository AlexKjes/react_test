

export class Game {

  constructor(){
    this.id = "";
    this.name = "";
    this.size = "";
    this.teamSize = 0;
    this.teams = [[]];
  }

  get nPlayers(){
    let ret = 0;
    for (let i=0;i<this.teams.length;i++){
      ret += this.teams[i].length;
    }
    return ret;
  }

  set nTeams(num){
    this.teams = [];
    for (let i=0;i<num;i++){
      this.teams.push([]);
    }
  }

  get nTeams(){
    return this.teams.length;
  }

  addPlayer(player, team){
    if (team === undefined){
      let idx = 0;
      let min = this.teamSize;
      for (let i=0;i<this.teams.length;i++) {
        if (min > this.teams[i].length){
          idx = i;
          min = this.teams[i].length;
        }
      }
      team = idx;
    }

    if (this.teams[team].length < this.teamSize){
      this.teams[team].push(player);
      return true;
    }
    return false;
  }

  removePlayer(player){
    for (let i=0;i<this.teams.length;i++){
      for (let j=0;j<this.teams[i].length;j++){
        if (this.teams[i][j].id === player.id){
          this.teams[i].splice(j, 1);
          return true;
        }
      }
    }
    return false;
  }


}
