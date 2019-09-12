const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const Video = mongoose.model('Video');
var ObjectId = require('mongoose').Types.ObjectId
const videoController = {}

videoController.getVideosPaging = async (req, res) => {
    // seetings
    var page = 1;
    var per_page = 5;
    var total = 0;

    if (req.query.page) page = req.query.page;

    var query = {};
    var search = req.query.search;

    if (search) {
        var regex = new RegExp(search, "i");
        var query = {
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

videoController.getVideo = async (id, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`)

    let video = await Video.findById(id)
    return video
}

videoController.createVideo = async (item, res) => {
    let _video = await Video.findOne({
        name: item.name,
        author: item.author
    })
    if (_video) throw res.status(403).send({
        success: false,
        msg: "This video's name existed, please try another!"
    })
    else {
        let video = new Video(item)
        await video.save()
        return video
    }
}

module.exports = videoController