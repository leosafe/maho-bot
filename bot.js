let Discordie = require('Discordie');
var commands = require('./commands');

const Events = Discordie.Events;
const Client = new Discordie();
const d = Client.Dispatcher;
const regex = /^maho./g;
const prefix = 'maho.';

Client.connect({
    token: 'MjkyNDA4NjkyNTcyMjkxMDcz.C63oDQ.p8Bc0Cg6XbMVXAoBPhDR1qpHCtI'
});

d.on(Events.GATEWAY_READY, e => {
    console.log('Conected as user ' + Client.User.username);
});


d.on(Events.MESSAGE_CREATE, e => {
    let d = new Date();
    let date = d.getTime();
    let msg = e.message.content;
    let prefix_split = msg.split(prefix)[1];
    let split_message = prefix_split ? prefix_split.split(' ') : '';

    let command = split_message[0];
    let message = prefix_split ? prefix_split.split(/ (.+)/)[1] : '';

    if(regex.test(msg) && typeof(commands[command]) == 'function') {
        commands[command]().main(e, date, message);
    }
});
