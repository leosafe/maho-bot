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

            if(!_global.playLock) {
            YoutubeSearch(msg, function(videos) {
                let title = "```python";
                for (var index = 0; index < videos.length; index++) {
                    let t = videos[index].title;

                    title += "\n " + (index + 1) + ". " + t.replace(/"|'/g, '');
                }

                title += "```";


                _global.playLock = true;
                _global.author = e.author.id;
                _global.videos = videos;
                e.channel.sendMessage(title);

            });
        } else {

                if(typeof(parseInt(msg)) != 'number' || !parseInt(msg) || parseInt(msg) > _global.videos.length) {
                    e.channel.sendMessage('``` A opção escolhida é inválida, escolha um número de 1 até ' + _global.videos.length + ' ```');
                    return false;
                }

                msg = msg <= 0 ? 0 : msg - 1;

                let musicId = _global.videos[msg].id;
                
                let msay = "```python";
                msay += '\n Playing: "' + _global.videos[msg].title + '"';
                msay += '```';   

                e.channel.sendMessage(msay);
                
                _global.playLock = false;
                _global.videos = [];
                
            
                let voiceChannelID = e.member.voiceChannelID;
                let voiceChannel = e.member.voiceChannel;
                const streamOptions = { seek : 0, volume : 1}
                self.userId = e.author.id;

                voiceChannel.join()
                .then(function(connection)
                {
                    const stream = ytdl('https://www.youtube.com/watch?v='+musicId, {filter : 'audioonly', begin : 147456});
                    let dispatcher = connection.playStream(stream, streamOptions);
                    /*

                    stream.on('progress', function(chunkLength, downloaded, total) {
                        process.stdout.cursorTo(0);
                        process.stdout.clearLine(1);
                        process.stdout.write((downloaded / total * 100).toFixed(2) + '%');
                        console.log((downloaded / total * 100).toFixed(2) + '%');
                    });

                    stream.on('end', function() {
                        process.stdout.write('\n');
                        console.log('end');
                    });

                    stream.on('response', function(res) {
                        size = res.headers['content-length'];
                        console.log('size', size);
                    });
                    
                    var dataEmitted = 0;
                    stream.on('data', function(chunk) {
                        dataEmitted += chunk.length;
                        //console.log('on data', chunk.length, dataEmitted);
                    });

                    
                    stream.on('end', function() {
                        console.log('emitted', dataEmitted);
                    });
                    */

                    connection.on('error', (err) =>
                    {
                        console.log("err : ", err);
                    });
                    connection.on('disconnected', (err) =>
                    {
                        console.log("err : ", err);
                    });
                })
                .catch(function(e)
                {
                    console.log("err : ",e);
                });

                
            }

        });
    }

    return this;
}

module.exports = play;