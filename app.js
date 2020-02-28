require('dotenv').config();
let express = require('express');
let path = require('path');
let app = express();
let func = require('./functions');
let db = require('./db_driver')

const PORT = process.env.APP_PORT || 3000;
const REDIR_COOKIE_LIVE = 4000; //FrontendRedirect cookie lives, ms

app.use('/static', express.static(__dirname + '/frontend/build/static'));
app.set('trust proxy', true);

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.get('/log', function (req, res) {
  res.cookie('FrontendRedirect', 'log', { expires: new Date(Date.now() + REDIR_COOKIE_LIVE)});
  res.redirect('/');
});

app.get('/api/stat', function (req, res) {
  let ipAddress = func.getClientIP(req.ip);
  db.selectFromTable(ipAddress, (rec) => {
    res.json(rec.reverse());
  });
});

app.get('/api/:memb', function (req, res) {
  const memb = Number(req.params.memb);
  const ip = func.getClientIP(req.ip);
  const numb = func.getFibMember(memb);
  db.initTable();
  db.insertIntoTable(ip, memb, numb);
  res.json({
    FibNumb: numb
  });
});

app.get('*', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.status(404).sendFile(path.join(__dirname + '/frontend/build/404.html'));
});



app.listen(PORT, function () {
  console.log(`Fibonacci numbers app listening on port ${PORT}!`);
});
