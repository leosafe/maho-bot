var _ = require('underscore');

function ping() {
    self = this;

    this.main = function(e, date) {
        return new Promise((resolve, reject) => {
            let i = new Date();
            let now = i.getTime();
            e.message.channel.sendMessage("pong!? " + ' `' + (now - date) + ' ms`');
        });
    }

    return this;
}

module.exports = ping;