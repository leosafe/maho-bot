var _ = require('underscore');
var fs = require('fs');


function leave() {
    self = this;

    this.main = function(e, msg) {
        return new Promise((resolve, reject) => {

            const channel = e.member.voiceChannel;
            e.channel.sendMessage('``` Leaving! ```');
            channel.leave();

        });
    }

    return this;
}

module.exports = leave;