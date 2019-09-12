const mongoose = require('mongoose');
var constants = require("./constants");

mongoose.connect(`mongodb://${constants.CONFIG_VALUE.username}:${constants.CONFIG_VALUE.password}@ds117535.mlab.com:17535/postedvideo`,
{ useNewUrlParser: true }, (err) => {
    if (!err)
        console.log('Connect MongoDB Successfully');
    else
        console.log(`Error in MongoDB connection : ${JSON.stringify(err, undefined, 2)}`);

});
module.exports = mongoose;