require('dotenv').config()
var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: process.env.TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'Test Attendance'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.postMessageToChannel('test-bot', 'meow!', params);
    
    // define existing username instead of 'user_name'
    // bot.postMessageToUser('user_name', 'meow!', params); 
    
    // If you add a 'slackbot' property, 
    // you will post to another user's slackbot channel instead of a direct message
    // bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist
    // bot.postMessageToGroup('private_group', 'meow!', params); 
});