const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const Video = mongoose.model('Video');
var ObjectId = require('mongoose').Types.ObjectId
const videoController = {}
const request = require('request')
const constants = require('../../config/constants')

videoController.getVideosPaging = async (req, res) => {
    // seetings
    var page = 1;
    var per_page = 5;
    var total = 0;

    if (req.query.page) page = req.query.page;
    var search = req.query.search
    var query = {}
    if (search) {
        var regex = new RegExp(search, "i");
        query = {
            name: regex
        };
    }

    // Find
    Video.find(query, (err, videos) => {
        if (err) res.json({
            data: [],
            err: "Error"
        });
        Video.count(query, (err, total) => {
            if (err) res.json({
                data: [],
                err: "Error"
            });
            res.json({
                data: videos,
                count: total
            });
        });

    }).sort('-name').skip((page - 1) * per_page).limit(per_page);
}

videoController.getVideosPagingV2 = async (req, res) => {
    let token = req.session.user ? req.session.user.token : req.headers.Authorization
    if(!token) res.status(403).send({sucess: false, msg: constants.responseStatus.TOKEN_NOT_FOUND})
    else {
        var query = {
            key: constants.YOUTUBE_API_KEY,
            type: 'video',
            maxResults: 5,
            part: 'snippet',
            location: req.query.location,
            locationRadius: req.query.locationRadius,
            pageToken: req.query.pageToken
        }
        request.get({
            url: constants.YOUTUBE_URI_SEARCH,
            qs: query
        }, (err, response) => {
            var result = JSON.parse(response.body)
            // result.items.map((e) => {
            //     if(e.snippet.title.length > 25) {
            //         e.snippet.title = e.snippet.title.substring(0,25) + '...'
            //       }
            // })
            return res.send(result)
        })
    }
}

videoController.getVideo = async (id, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`${constants.responseStatus.NO_RECORD_WITH_ID}: ${req.params.id}`)

    let video = await Video.findById(id)
    return video
}

module.exports = videoController