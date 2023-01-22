const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../Middlewares/authMiddleware')
const { getFullImage } = require('../Services/imageService.js')

// router.post('/', async (req, res) => {
//     let result = await createChat(req.body.senderId, req.body.receiverId)

//     return res.status(200).json(result) || res.status(500).json(result)
// })

router.get('/:imageId/:token', async (req, res) => {
    let result = await getFullImage(req.params.imageId)

    return res.status(200).json(result) || res.status(500).json(result)
})

module.exports = router
