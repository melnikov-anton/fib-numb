/**
 * @file app.js - main application
 * @author Anton Melnikov
 */
require('dotenv').config();
const express = require('express');
const path = require('path');
const func = require('./src/functions');
const db = require('./src/db_driver');

const app = express();

const PORT = process.env.APP_PORT || 3000;
const REDIR_COOKIE_LIVE = 4000; // FrontendRedirect cookie lives, ms

app.use('/static', express.static(path.join(__dirname, '/frontend/build/static')));
app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.get('/log', (req, res) => {
  res.cookie('FrontendRedirect', 'log', { expires: new Date(Date.now() + REDIR_COOKIE_LIVE) });
  res.redirect('/');
});

app.get('/api/stat/:days', (req, res) => {
  const days = Number(req.params.days);
  const ipAddress = func.getClientIP(req.ip);
  db.selectFromTable(ipAddress, days, (rec) => {
    console.log(rec);
    res.json(rec.reverse());
  });
});

app.get('/api/:memb', (req, res) => {
  const memb = Number(req.params.memb);
  const ip = func.getClientIP(req.ip);
  const numb = func.getFibMember(memb);
  db.initTable();
  db.insertIntoTable(ip, memb, numb);
  res.json({
    FibNumb: numb,
  });
});

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(404).sendFile(path.join(__dirname, '/frontend/build/404.html'));
});


app.listen(PORT, () => {
  db.initTable();
  console.log(`Fibonacci numbers app listening on port ${PORT}!`);
});
