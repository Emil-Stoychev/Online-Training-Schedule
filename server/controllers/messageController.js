const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../Middlewares/authMiddleware')
const { addMessage, getMessages } = require('../Services/messageService')


router.post('/', async (req, res) => {
    let result = await addMessage(req.body.chatId, req.body.senderId, req.body.text)

    return res.status(200).json(result) || res.status(500).json(result)
})
router.get('/:chatId', async (req, res) => {
    let result = await getMessages(req.params.chatId)

    return res.status(200).json(result) || res.status(500).json(result)
})
// router.get('/find/:firstId/:secondId', async (req, res) => {
//     let result = await findChat(req.params.firstId, req.params.secondId)

//     return res.status(200).json(result) || res.status(500).json(result)
// })


module.exports = router
