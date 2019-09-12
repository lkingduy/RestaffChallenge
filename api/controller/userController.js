const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId
const paginate = require('jw-paginate');
const userController = {}

userController.getUsersPaging = async (pageQuery) => {
    let users = await User.find({})

    // get page from query params or default to first page
    const page = parseInt(pageQuery) || 1;

    // get pager object for specified page
    const pageSize = 5;
    const pager = paginate(users.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = users.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
}

userController.getUsers = async () => {
    let users = await User.find({})
    return users
}

userController.getUser = async (id, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`)

    let user = await User.findById(id)
    return user
}

userController.createUser = async (item, res) => {
        let _user = await User.findOne({
            username: item.username
        })
        if (_user) throw res.status(403).send({
            success: false,
            msg: 'This account existed'
        })
        else {
            let user = new User(item)
            user.password = user.encryptPassword(user.password)
            await user.save()
            return user
        }
}

userController.login = async (req, res) => {
    let user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        res.status(401).send({
            success: false,
            msg: 'This account is invalid'
        });
    } else {
        if (!user.validPassword(req.body.password, user.password)) {
            // check if password matches
            res.status(401).send({
                sucess: false,
                msg: 'Wrong password, please try again'
            })
        } else {
            req.session.user = user.toAuthJSON()
            return user
        }
    }
}

userController.updateUser = async (id, item, res) => {
    if (!ObjectId.isValid(id))
        return res.status(400).send(`No record with given id: ${id}`)

    var updateUser = {
        fullname: item.fullname,
        timeModifier: Date.now
    }
    await User.findByIdAndUpdate(id, {
        $set: updateUser
    }, {
        new: true
    })
}

userController.deleteUser = async (id, res) => {
    if (!ObjectId.isValid(id))
        return res.status(400).send(`No record with given id: ${id}`)

    await User.findByIdAndRemove(req.params.id)
}


module.exports = userController