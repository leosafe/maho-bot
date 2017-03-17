var _ = require('underscore');

function say() {
    self = this;
    name = 'say';

    this.main = function(e, date, message) {
        return new Promise((resolve, reject) => {
            let i = new Date();
            let now = i.getTime();

            e.message.channel.sendMessage(message + ' `' + (now - date) + ' ms`');
        });
    }

    return this;
}

module.exports = say;