var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {path: '/'});//, {path: '/api'});

var list = io.path('/server-list');
var i = 0;


// test
var ServerList = require('./server_list');

var serverList = new ServerList();


app.get('/', function(req, res){
  console.log(Json.stringify(serverList.servers));
  res.json(200);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('message', function(m){
    console.log(m);
  })


})


setInterval(()=>{
  list.emit("message", i+"");
  i++;
}, 1000);

http.listen(5000, function(){
  console.log('listening on *:5000');
});
