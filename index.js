require('dotenv').config()

const port = process.env.PORT || 3000;
const http = require('http')
const express = require('express');
const app = express();

const Date = require('./utils/date')
const { textHandler } = require('./handler/text');

// create a bot
var { bot } = require('./bot.js');

bot.on('start', function () {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
    icon_emoji: ':cat:'
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
  // bot.postMessageToChannel('test-attendance-bot', 'meow!', params);

  // define existing username instead of 'user_name'
  // bot.postMessageToUser('user_name', 'meow!', params); 

  // If you add a 'slackbot' property, 
  // you will post to another user's slackbot channel instead of a direct message
  // bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 

  // define private group instead of 'private_group', where bot exist
  // bot.postMessageToGroup('private_group', 'meow!', params); 
});

bot.on('message', function (event) {
  // all ingoing events https://api.slack.com/rtm
  try {
    const { user, text, channel } = event;

    if (channel === process.env.CHANNEL_ID && user && text) {
      textHandler(user, text);
    }
  } catch (error) {
    console.log(error);
  }
});

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
