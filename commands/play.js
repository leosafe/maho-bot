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

    var requestUrl = 'https://www.googleapis.com/youtube/v3/search' + `?part=snippet&minResults=7&maxResults=7&q=${encodeURI(searchKeywords)}&key=AIzaSyBwJKRZxKPuPrXxu4kEEpOMf49Mr7qDU6M`;
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

function MahoResponse(videos) {
}

function play() {
    self = this;
    this.main = function(bot, date, msg, channelID, userObj) {
        return new Promise((resolve, reject) => {
            let i = new Date();
            let now = i.getTime();
            YoutubeSearch(msg, function(videos) {
                let title = "```python";
                for (var index = 0; index < videos.length; index++) {
                    title += "\n " + (index + 1) + ". " + videos[index].title;
                }

                title += "```";

                console.log(title);

                 bot.sendMessage({
                    to: channelID,
                    message: title
                });
            });

        });
    }

    return this;
}

module.exports = play;