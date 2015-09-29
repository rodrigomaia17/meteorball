var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;

var players = [];

io.on('connection', function(socket){

    socket.on('register myself', function(data){
      console.log('a user connected with id '+data);
      players.push(data);
    });
    
    socket.on('update positions', function(data){
      socket.broadcast.emit('update ui', data);
    });
});

app.use(express.static('public'));
http.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
