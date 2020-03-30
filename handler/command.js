const { selectLastTypeAndTime, selectRecords, insertTypeIn, insertTypeOut } = require('../db/client');
const { sendMessage } = require('../utils/messageSender')
// create a bot
var { bot } = require('../bot.js');

async function commandHandler(user, command) {
  const record = await selectLastTypeAndTime(user) || null;
  let userName = '';
  const dateNow = new Date();
  for (const userObject of bot.users) {
    if (userObject.id == user) {
      userName = userObject.real_name;
      break;
    }
  }
  if (record.length === 0) {
    if (command[0] === 'in') {
      await insertTypeIn(user)
      sendMessage(process.env.CHANNEL_NAME_TO, `*${userName}* ined ${dateNow}`)
    } else {
      sendMessage(process.env.CHANNEL_NAME_TO, `*${userName}* you can type in first`)
    }
  }
  switch (command[0]) {
    case 'in':
      if (record[0].type !== 'in') {
        await insertTypeIn(user);
        sendMessage(process.env.CHANNEL_NAME_TO, `*${userName}* ined ${dateNow}`)
      } else {
        sendMessage(process.env.CHANNEL_NAME_TO, `*${userName}* already in`)
      }
      break;
    case 'out':
      if (record[0].type !== 'out') {
        await insertTypeOut(user);
        sendMessage(process.env.CHANNEL_NAME_TO, `*${userName}* outed ${dateNow}`)
      } else {
        sendMessage(process.env.CHANNEL_NAME_TO, `*${userName}* already out`)
      }
      break;
    case 'list':
      let sortDir = 'desc';
      if (['asc', 'desc'].includes(command[1])) {
        sortDir = command[1];
      }
      const records = await selectRecords(user, sortDir)
      const response = records
        .map(r => `type: ${r.type} time: ${r.timestamp}`)
        .reduce((pre, cur) => cur + '\n' + pre);
      sendMessage(process.env.CHANNEL_NAME_TO, response)
      break;
    default:
      console.log(`command[0] '${command[0]}' not found`)
  }
}

module.exports = {
  commandHandler
}