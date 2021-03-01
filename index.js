const serverless = require('serverless-http');
const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname,
  });
});

module.exports.handler = serverless(app);
