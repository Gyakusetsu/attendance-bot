const { selectLastTypeAndTime, selectRecords, insertTypeIn, insertTypeOut } = require('../db/client');
const { sendMessage } = require('../utils/messageSender')

async function commandHandler(user, command) {
  const record = await selectLastTypeAndTime(user) || null;
  if (record.length === 0) {
    if (command[0] === 'in') {
      await insertTypeIn(user)
      sendMessage(process.env.CHANNEL_NAME_TO, 'ined')
    } else {
      sendMessage(process.env.CHANNEL_NAME_TO, 'you can type in first')
    }
  }
  switch (command[0]) {
    case 'in':
      if (record[0].type !== 'in') {
        await insertTypeIn(user);
        sendMessage(process.env.CHANNEL_NAME_TO, 'ined')
      } else {
        sendMessage(process.env.CHANNEL_NAME_TO, 'already in')
      }
      break;
    case 'out':
      if (record[0].type !== 'out') {
        await insertTypeOut(user);
        sendMessage(process.env.CHANNEL_NAME_TO, 'outed')
      } else {
        sendMessage(process.env.CHANNEL_NAME_TO, 'already out')
      }
      break;
    case 'list':
      const records = await selectRecords(user)
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