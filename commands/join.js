var _ = require('underscore');
var fs = require('fs');


function join() {
    self = this;

    this.main = function(e, msg) {
        return new Promise((resolve, reject) => {

        const channel = e.member.voiceChannel;

        e.channel.sendMessage('``` Connected! ```')

        channel.join()
        .then(connection => console.log('connected'))
        .catch(console.error);
        });
    }

    return this;
}

module.exports = join;