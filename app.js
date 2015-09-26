var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
