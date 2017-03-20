var _ = require('underscore');

function ping() {
    self = this;

    this.main = function(bot, date, msg, channelID, userObj) {
        return new Promise((resolve, reject) => {
            let i = new Date();
            let now = i.getTime();

            let message = "```pong!```";

            bot.sendMessage({
                to: channelID,
                message: message
            });
        });
    }

    return this;
}
/*
[ 'presenceStatus',
  'connected',
  'inviteURL',
  'connect',
  '_events',
  '_eventsCount',
  'servers',
  'channels',
  'users',
  'directMessages',
  'internals',
  'verified',
  'username',
  'mfa_enabled',
  'id',
  'email',
  'discriminator',
  'bot',
  'avatar' ]
*/
module.exports = ping;