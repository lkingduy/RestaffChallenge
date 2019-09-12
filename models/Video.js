var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constants = require('../config/constants')

var VideoSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    authorImage: {
        type: String,
        default: constants.USER_IMAGE
    },
    image: {
        type: String,
        default: constants.VIDEO_IMAGE
    },
    description: {
        type: String,
        default: ''
    },
    location: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Number,
        default: Date.now()
    },
    timeModifier: {
        type: Number,
        default: Date.now()
    }
}, {usePushEach: true})

module.exports = mongoose.model('Video', VideoSchema);