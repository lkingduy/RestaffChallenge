const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/', async (req, res) => {
    try {
        let users = await userController.getUsers()
        return res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

router.get('/logout' ,function(req, res){
    req.logout();
    req.session.destroy()
    res.redirect('/');
  })

router.get('/:id', async (req, res) => {
    try {
        let user = await userController.getUser(req.params.id, res)
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

router.post('/signup', async (req, res) => {
    try {
        let user = await userController.createUser(req.body, res)
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        let user = await userController.login(req, res)
        // if user is found and password is right create a token return the information including token as JSON
        if (user)
            res.json({
                success: true,
                user: user.toAuthJSON()
            })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
});

router.put(':/id', async (req, res) => {
    try {
        await userController.updateUser(req.params.id, req.body, res)
        return res.status(200)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

router.delete(':/id', async (req, res) => {
    try {
        await userController.deleteUser(req.params.id, res)
        return res.status(200)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

module.exports = router