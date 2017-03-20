var youtubedl = require('youtube-dl');
var ytdl = require('ytdl-core');
var Youtube = require('youtube-api');
var ffmpeg = require('fluent-ffmpeg');
var request = require('request');
var youtubesearch = require('youtube-search');
var fs = require('fs');
var voice = require("../voice.js");
var playlistReg = /[&?]list=([a-z0-9_\-]+)/gi;

var opts = {
    maxResults: 5,
    key: config.youtube_api,
    type: "video"
};

var download = function (url, message, cb, fb) {
    let dl;
    if (music.ytRegex.test(url)) {
        dl = ytdl;
    } else {
        dl = youtubedl;
    }

    dl.getInfo(url, function (err, info) {
        if (err) {
          return false;
        } else if (checkTime(info)) {
            // winston.info(checkTime(info));
            let id;
            if (music.ytRegex.test(url)) {
                id = info.video_id;
            } else {
                id = info.id;
            }
            info.id = id;
            songModel.findOne({id: id}, function (err, Song) {
                if (err) return cb(err);
                if (!Song) {
                    var video;

                } else {
                    cb(null, info);
                }
            });
        }
        else {
            cb('The Song is to long.', info);
        }
    });
};

module.exports = {download: download, search: search};