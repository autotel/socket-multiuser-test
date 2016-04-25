var app = require('express')();
var httpa = require('http').Server(app);
var httpb = require('http').Server(app);
var io = require('socket.io')(httpa);
var iob = require('socket.io')(httpb);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

httpa.listen(3000, function(){
  console.log('listening on *:3000');
});

httpb.listen(80, function(){
  console.log('listening on *:80');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message',msg);
  });
});

iob.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message',msg);
  });
});
