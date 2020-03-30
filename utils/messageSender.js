// create a bot
var { bot } = require('../bot.js');

function sendMessage(channel, text) {
  bot.postMessageToChannel(channel, text);
}

module.exports = {
  sendMessage
}