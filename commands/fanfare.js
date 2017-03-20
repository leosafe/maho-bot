var fs = require('fs');
var path = require('path');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var youtubedl = require('youtube-dl');


let url = 'https://www.youtube.com/watch?v=-YCN-a0NsNk';


function fanfare() {
    self = this;
    this.main = function(bot, date, msg, channelID, userObj) {
        return new Promise((resolve, reject) => {

            let voiceChannelID = userObj.voice_channel_id;
            self.userId = userObj.id;
            if(voiceChannelID) {

               console.log(bot.servers['252966227486441472'].channels[voiceChannelID]);

            }
        });
    }

    this.createTempSong = function(callback) {

        url = "https://www.youtube.com/watch?v=SsWyjrQsTis";
        info = { id: "SsWyjrQsTis" };

        video = youtubedl(url, ["--restrict-filenames", "-4"], {
            cwd: __dirname,
            maxBuffer: Infinity
        });
        video.on('error', function (err) {
            console.log(err);
        });
        var filename = info.id + ".temp";
        var stream = video.pipe(fs.createWriteStream('temp/' + filename));

        video.on('info', function (info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            console.log('duration: ' + info.duration);
        });

        video.on('complete', function complete(info) {
            console.log('filename: ' + info._filename + ' finished');
            cb(null, info);
        });

        video.on('end', function () {
            ffmpeg(fs.createReadStream('temp/' + filename)).output('./audio/' + info.id + '.mka').outputOptions(['-vn', '-acodec copy'])
                .on('stderr', err => {

                }).on('error', err => {
                console.log(err);
                return cb(err);
            }).on('end', (stdout, stderr) => {
                console.log('Finished Converting');
                fs.unlink('temp/' + filename, function (err) {
                    if (err) return cb(err);
                    var song = {
                        title: info.title,
                        alt_title: info.alt_title,
                        id: info.id,
                        addedBy: self.userId,
                        addedAt: Date.now(),
                        duration: info.duration,
                        type: "audio/mka",
                        url: url,
                        dl: "stream",
                        dlBy: "main",
                        cached: true,
                        cachedAt: new Date(),
                        path: `audio/${info.id}.mka`
                    }

                    if(typeof(callback) == 'function') {
                        callback(song);
                    }
                });
            }).run();
        });
    }

    return this;
}

module.exports = fanfare;