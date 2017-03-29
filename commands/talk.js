var _ = require('underscore');
var fs = require('fs');
var apiai = require('apiai');

function talk() {
    self = this;

    this.main = function(e, msg) {

        return new Promise((resolve, reject) => {
            self.message = e;
            var app = apiai("77d119ca44de4b4a8da215ec171c8bbb");

            var options = {
                sessionId: 'session-'+e.author.id
            };

            let talk = function(response) {
                e.channel.sendMessage(response.result.fulfillment.speech);
            }

            var request = app.textRequest(msg, options);

            request.on('response', function(response) {
                console.log(response);
                talk(response);
            });

            request.on('error', function(error) {
                console.log(error);
            });

            request.end();
        });
    }

    return this;
}

module.exports = talk;