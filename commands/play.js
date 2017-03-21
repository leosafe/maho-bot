var fs = require('fs');
var path = require('path');
var ytdl = require('ytdl-core');
var mp4 = require('mp4-stream');
var request = require('request');

var encoder = mp4.encode()
var decoder = mp4.decode()

let url = 'https://www.youtube.com/watch?v=-YCN-a0NsNk';

function YoutubeSearch(searchKeywords, callback) {
    console.log(searchKeywords);

    var requestUrl = 'https://www.googleapis.com/youtube/v3/search' + `?part=snippet&minResults=6&maxResults=6&q=${encodeURI(searchKeywords)}&key=AIzaSyBwJKRZxKPuPrXxu4kEEpOMf49Mr7qDU6M`;
    console.log(requestUrl);
    let videos = [];

    request(requestUrl, (error, response) => {
        if (!error && response.statusCode == 200) {

            var body = JSON.parse(response.body);
            if (body.items.length == 0) {
                console.log("Your search gave 0 results");
                return videoId;
            }

            for (var item of body.items) {
                if (item.id.kind === 'youtube#video') {
                    videos.push({id: item.id.videoId, title: item.snippet.title});
                }
            }

            if(typeof(callback) == 'function') {
                callback(videos);
            }
        }
        else {
            console.log("Unexpected error when searching YouTube");
            return null;
        }
    });
}

this.createTempSong = function(id, callback) {

    url = "https://www.youtube.com/watch?v=" + id;
    info = { id: id };

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

function play() {
    self = this;
    this.main = function(e, msg, _global) {
        return new Promise((resolve, reject) => {

            YoutubeSearch(msg, function(videos) {
                let title = "```python";
                for (var index = 0; index < videos.length; index++) {
                    title += "\n " + (index + 1) + ". " + videos[index].title;
                }

                title += "```";


                _global.playLock = true;
                _global.author = e.author.id;
                e.channel.sendMessage(title);

            });



        });
    }

    return this;
}

module.exports = play;