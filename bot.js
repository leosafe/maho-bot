const commands = require('./commands');
const regex = /^maho./g;
const prefix = 'maho.';
const Discord = require('discord.js');
const bot = new Discord.Client();
const BrazilStory = '252966227486441472';

bot.login('MjkyNDA4NjkyNTcyMjkxMDcz.C63oDQ.p8Bc0Cg6XbMVXAoBPhDR1qpHCtI');

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    console.log(message);


    let d = new Date();
    let date = d.getTime();
    let prefix_split = message.split(prefix)[1];
    let split_message = prefix_split ? prefix_split.split(' ') : '';
    let command = split_message[0];
    let msg = prefix_split ? prefix_split.split(/ (.+)/)[1] : '';
    let userObj = bot.servers[BrazilStory].members[userID];
    let mahoObj = bot.servers[BrazilStory].members[bot.id];

    if(regex.test(message) && typeof(commands[command]) == 'function') {
        commands[command]().main(bot, date, msg, channelID, userObj, mahoObj);
    }
});

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login('your token');
