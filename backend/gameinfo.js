



function GameInfo(name, size, teamSize, nTeams, creator){

  this.id = Math.floor(Math.random()*999999999999)+"";
  this.name = name;
  this.size = size;
  this.teamSize = teamSize;
  this.teams = [];
  this.creator = creator;

  for (var i=0;i<nTeams;i++){
    this.teams.push([]);
  }
  this.teams[0].push(creator);

}

GameInfo.prototype.toJson = function(){
  return JSON.stringify({
    "id": this.id,
    "name": this.name,
    "size": this.size,
    "teamSize": this.teamSize,
    "nTeams": this.teams.length,
    "creator": this.creator,
    "teams": this.teams
  });
}

GameInfo.prototype.addPlayer = function(player){
  var idx = 0;
  var min = this.teamSize;
  for (var i=0;i<this.teams.length;i++){
    if (this.teams[i].length < min){
      idx = i;
      min = this.teams[i].length;
    }
    for (var j=0;j<this.teams[i].length;j++){
      if (this.teams[i][j].id === player.id){
        return 1;
      }
    }
  }
  if (min < this.teamSize){
    this.teams[idx].push(player);
    return 0;
  }
  return -1;
}


module.exports = GameInfo;
