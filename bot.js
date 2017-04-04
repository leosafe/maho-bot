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
});
bot.on('message', function(e) {

    let userID = e.author.id;
    let channelID = e.channel.id;
    let message = e.content;
    let prefix_split = message.split(prefix)[1];
    let split_message = prefix_split ? prefix_split.split(' ') : '';
    let command = split_message[0];
    let msg = prefix_split ? prefix_split.split(/ (.+)/)[1] : '';

    if(regex.test(message) && typeof(commands[command]) == 'function') {
        commands[command]().main(e, msg, _global);
    }
});
