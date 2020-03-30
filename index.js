require('dotenv').config()
const http = require('http')
const fetch = require('isomorphic-fetch')
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(process.env.TOKEN);
const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Date = require('./utils/date')
const { textHandler } = require('./handler/text');

app.use(bodyParser.json());

app.post('/slack/events', (req, res) => {
  console.log(req.body);
  res.status(200).json({
    "challenge": req.body.challenge
  });
})
// app.use('/slack/events', slackEvents.expressMiddleware());

slackEvents.on('message', (event)=> {
  console.log(event);
  const { user, text, channel } = event;
  if (channel === process.env.CHANNEL_ID && user) {
    textHandler(user, text);
  }
});

slackEvents.on('error', console.error);

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});

