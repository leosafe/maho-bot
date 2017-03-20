var _ = require('underscore');

function say() {
    self = this;
    name = 'say';

    this.main = function(bot, date, msg, channelID) {
        return new Promise((resolve, reject) => {
            let i = new Date();
            let now = i.getTime();

            let message = '```' + msg + '```';

            bot.sendMessage({
                to: channelID,
                message: message
            });
        });
    }

    return this;
}

module.exports = say;