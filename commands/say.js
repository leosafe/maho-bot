var _ = require('underscore');

function say() {
    self = this;
    name = 'say';

    this.main = function(e, msg) {
        return new Promise((resolve, reject) => {
            let i = new Date();
            let now = i.getTime();
            console.log(msg);

            let message = '```' + msg + '```';

            e.channel.sendMessage(message);
        });
    }

    return this;
}

module.exports = say;