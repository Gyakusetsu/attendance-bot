
var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
  token: process.env.TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
  name: 'attendance-bot'
});

function sendMessage(channel, text) {
  bot.postMessageToChannel(channel, text);
}

module.exports = {
  sendMessage
}