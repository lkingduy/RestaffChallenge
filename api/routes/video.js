const express = require('express')
const router = express.Router()
const videoController = require('../controller/videoController')

router.get('/', async (req, res) => {
    try {
        await videoController.getVideosPagingV2(req, res)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let video = await videoController.getVideo(req.params.id, res)
        return res.status(200).send(video)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

module.exports = router