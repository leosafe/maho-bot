var _ = require('underscore');
var fs = require('fs');


function leave() {
    self = this;

    this.main = function(bot, date, msg, channelID, userObj, mahoObj) {
        return new Promise((resolve, reject) => {
            let voiceID = mahoObj.voice_channel_id;
            console.log(mahoObj);
            if(voiceID) {
                bot.leaveVoiceChannel(voiceID, function(err, resp) {
                    if(err) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'ERRO ERRO ERRO'
                        });
                        return false;
                    }

                     bot.sendMessage({
                        to: channelID,
                        message: '```Saindo :D```'
                    });
                });
            } else {
                bot.sendMessage({
                    to: channelID,
                    message: '```Não estou em nenhum channel o_o, controle-se```'
                });
            }
        });
    }

    return this;
}

module.exports = leave;