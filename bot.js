const commands = require('./commands');
const regex = /^maho./g;
const prefix = 'maho.';
const Discord = require('discord.js');
const bot = new Discord.Client();
const BrazilStory = '252966227486441472';

_global = {
    playLock: false,
    author: '',
    options: 0,
    tyrant : []
}

bot.login('MjkyNDA4NjkyNTcyMjkxMDcz.C63oDQ.p8Bc0Cg6XbMVXAoBPhDR1qpHCtI');

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', 'maho');
});

bot.on('message', function(e) {
    let userID = e.author.id;
    let channelID = e.channel.id;
    let message = e.content;

    console.log(_global);

    if(_global.playLock && regex.test(message) && e.author.id == _global.author) {

        if(e.content != 'C')
            e.reply('``` Escolha uma opção ou digite C para cancelar ```');
        else {
            _global.playLock = false;
            _global.author = '';
            e.channel.sendMessage('```Thank you! ```');
        }
    }

    let prefix_split = message.split(prefix)[1];
    let split_message = prefix_split ? prefix_split.split(' ') : '';
    let command = split_message[0];
    let msg = prefix_split ? prefix_split.split(/ (.+)/)[1] : '';

    if(regex.test(message) && typeof(commands[command]) == 'function') {
        commands[command]().main(e, msg, _global);
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
