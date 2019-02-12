const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const portNumber = process.env.PORT || 5000;

app.use(bodyParser.json());

// Only needed in dev mode
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

let messages = [];

app.get('/api/messages', (_, res) => {
  return res.send(messages);
});

app.post('/api/messages', ({ body: { user, message } }, res) => {
  if (!user) {
    return res.status(400).send('"user" is a required field on the request');
  }
  if (!message) {
    return res.status(400).send('"message" is a required field on the request');
  }
  messages = [...messages, { user, message, date: new Date().toISOString(), id: uuid() }];
  res.status(201).send(messages);
});

// Create link to React build directory
var distDir = __dirname + '/build/';
app.use(express.static(distDir));

app.listen(portNumber, () =>
  console.log(`Web Server Started on port ${portNumber}`)
);
