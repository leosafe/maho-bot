const commands = require('./commands');
const regex = /^maho./g;
const mah = /maho/g;
const mahg = /maho./g;
const prefix = 'maho.';
const Discord = require('discord.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maho');
const tyrant = require('./model/tyrant');

const bot = new Discord.Client();
const BrazilStory = '252966227486441472';

_global = {
    playLock: false,
    author: '',
    options: 0,
    ursus: false,
    tyrant : [],
    bot: bot
}

bot.login('MjkyNDA4NjkyNTcyMjkxMDcz.C63oDQ.p8Bc0Cg6XbMVXAoBPhDR1qpHCtI');

bot.on('ready', function() {
    bot.user.setGame('maho.help');
    console.log('ready');
});

bot.on('message', function(e) {

   /* if(mah.test(e.content) && !mahg.test(e.content) && regex.test(e.content)) {
        e.game("Falou em mim ? :3");
    }
    */
    let userID = e.author.id;
    let channelID = e.channel.id;
    let message = e.content;

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

    console.log(_global.bot);
    return false;

    if(regex.test(message) && typeof(commands[command]) == 'function') {
        commands[command]().main(e, msg, _global);
    }
});
