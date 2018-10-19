



function ServerList(){
    this.servers = {};

}

ServerList.prototype.addServer = function(server){
  this.servers[server.id] = server;
}

ServerList.prototype.getServer = function(server){
  return this.servers[server.id];
}

ServerList.prototype.getServers = function(server){
  return this.servers;
}

module.exports = ServerList;
