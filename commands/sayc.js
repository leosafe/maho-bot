var _ = require('underscore');

function say() {
    self = this;
    name = 'say';

    this.main = function(e, msg, _global, sendMessage) {
        return new Promise((resolve, reject) => {

            let channelRegex = new RegExp("<#(.*?)>");

            let channelID = channelRegex ? msg.match(channelRegex)[1].toString() : 0;

            let ch = _global.bot.channels.filter(function(i) {
                return i.id == channelID;
            });

            if(ch && channelRegex.test(msg)) {
                bot.sendMessage(channelID, 'teste');
            }

        });
    }

    return this;
}

module.exports = say;