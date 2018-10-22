var app = require('express')();
var http = require('http').createServer(app);
const bodyParser = require('body-parser');


var io = require('socket.io')(http);
var listPath = io.of('/server');
var i = 0;

if (!io){
  socketInit(http);
}

// test
const ServerList = require('./server_list');
const GameInfo = require('./gameinfo');

var serverList = new ServerList();
var userList = {};


app.use(bodyParser.json());
app.get('/', function(req, res){

  res.sendSatus(200);
});

// create user route
app.post('/user', postUser);
// grate new game loby route
app.post('/server', postGame);
// get game info
app.get('/server/:id', getGame);
// get all games
app.get('/server', (req, res) => {
  res.json(serverList.servers);
});
// join server
app.post('/server/join', (req, res)=>{
  // if game id is not in list
  if (serverList.servers[req.body.game.id] === undefined){
    res.sendStatus(404);
  } else {
    var isAdded = serverList.servers[req.body.game.id].addPlayer(req.body.user);
    if(isAdded === 0){ // player is added to game
      if (userList[req.body.user.id].inGame !== undefined){
        var sid = userList[req.body.user.id].inGame;
        serverList.servers[sid].removePlayer(req.body.user);
        if (serverList.servers[sid].nPlayers() === 0){
          io.in('server-list').emit('rm-server', serverList.servers[sid]);
          delete serverList.servers[sid];
        } else{
          io.to('game:'+sid).emit('update', serverList.servers[sid]);
          io.in('server-list').emit('add-server', serverList.servers[sid]);
        }
      }
      userList[req.body.user.id].inGame = req.body.game.id;
      res.sendStatus(200);
      io.in('game:'+req.body.game.id).emit('update', serverList.servers[req.body.game.id]);
      io.in('server-list').emit('add-server', serverList.servers[req.body.game.id]);
    } else if (isAdded === 1) { // user is already in game
      res.sendStatus(200);
    } else { // game full
      res.status(400).json({msg: "Server Full"});
    }
  }
});

// function for creating new game
function postGame(req, res){
  var gd = req.body// game data
  let game = new GameInfo(gd.name, gd.size, gd.teamSize,
     gd.nTeams, gd.creator);
  if (userList[gd.creator.id].inGame !== undefined){

    var sid = userList[gd.creator.id].inGame;
    serverList.servers[sid].removePlayer(gd.creator);
    if (serverList.servers[sid].nPlayers() === 0){
      io.in('server-list').emit('rm-server', serverList.servers[sid]);
      delete serverList.servers[sid];
    } else {
      io.to('game:'+sid).emit('update', serverList.servers[sid]);
      io.in('server-list').emit('add-server', serverList.servers[sid]);
    }
  }
  userList[gd.creator.id].inGame = game.id;
  serverList.addServer(game);
  io.to('server-list').emit("add-server", game);
  res.set('Content-Type', 'application/text');
  res.status(200).send(game.id);
}

// get game function for get/server/:id route
function getGame(req, res){
  console.log(req.params.id);
  var server = serverList.getServer(req.params);
  if (server === undefined){
    res.sendStatus(404);
  } else {
    res.json(server.toJson());
  }
}

// function for creating new user
function postUser(req, res){
  if (userList[req.body.id] !== undefined){
    console.log("adding existing user");
    res.sendStatus(400);
  } else {
    console.log("added user \"" + req.body.name+ "\"");
    userList[req.body.id] = req.body;
    res.sendStatus(200);
  }
}

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('room', (room)=>{
    console.log("user joined room: "+room);
    socket.join(room);
  });
  socket.on('leave', (room)=>{
    console.log("user left room: " + room);
    socket.leave(room);
  })
  socket.on('message', function(m){
    console.log(m);
    io.in(m.room).emit('message', {user: m.user, message: m.message});
  });
});




http.listen(5000, function(){
  console.log('listening on *:5000');
});
