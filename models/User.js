var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
var constants = require('../config/constants')

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        default: ''
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

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

UserSchema.methods.validPassword = function(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, constants.MY_SECRET);
  }
  
UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      username: this.username,
      token: 'Token ' + this.generateJWT(),
    };
  };

module.exports = mongoose.model('User', UserSchema);