var _ = require('underscore');

function ping() {
    self = this;

    this.main = function(e, date, msg, channelID, userObj) {
        return new Promise((resolve, reject) => {
            var ping = require('net-ping');
            var session = ping.createSession ();
            let targets = ['8.31.99.161','10.82.61.137','10.82.61.137:6071'];

            message = '```Reboot Channels: \n';

            let aux = 0;

           // e.channel.sendMessage('``` Requesting... ```');

            for (i = 0; i < targets.length ; i++) {
                session.pingHost (targets[i], function (error, target, sent, rcvd) {
                let ms = rcvd - sent;
                aux++;
                
                if (error) {
                    message += 'CH ' + (targets.indexOf(target) + 1) + ': Offline (timed out) ('+target+') \n';
                }
                else {
                    message += 'CH ' + (targets.indexOf(target) + 1) + ': Online  (' + ms + ' ms) ('+target+')';
                }

               });
            }

          /*  interval = setInterval(function() {
                if(aux == targets.length) {
                   message += '```';
                   e.channel.sendMessage(message);
                   clearInterval(interval);
                }
            }, 500)

            */

            m = '```pong!```';

            e.channel.sendMessage(m);

            

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