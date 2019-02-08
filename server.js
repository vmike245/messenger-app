const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const portNumber = process.env.PORT || 5000;

app.use(bodyParser.json());
let messages = [];

app.get('/api/messages', (_, res) => {
  return res.send(messages);
});

app.post('/api/messages', ({ body }, res) => {
  messages = [ ...messages, { ...body, date: new Date().toISOString() }];
  res.status(201).send(messages);
});

// Create link to React build directory
var distDir = __dirname + '/build';
app.use(express.static(distDir));

app.listen(portNumber, () =>
  console.log(`Web Server Started on port ${portNumber}`)
);
