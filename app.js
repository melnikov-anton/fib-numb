var express = require('express');
var path = require('path');
var app = express();

app.use('/static', express.static(__dirname + '/frontend/build/static'));

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.get('/api', function (req, res) {

  res.json({id: 1, title:'Post 1'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
