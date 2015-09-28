var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('update positions', function(data){
      console.log('recebi');
      socket.broadcast.emit('update ui', data);
    });
});

app.use(express.static('public'));
http.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
