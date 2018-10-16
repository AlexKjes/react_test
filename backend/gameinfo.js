



function GameInfo(name, size, teamSize, nTeams, creator){

  this.name = "";
  this.size = "";
  this.teamSize = 0;
  this.teams = [];

  for (var i=0;i<nTeams;i++){
    this.teams.push([]);
  }
  this.teams[0].push(creator);

}

GameInfo.prototype.toJson = function(){

}
