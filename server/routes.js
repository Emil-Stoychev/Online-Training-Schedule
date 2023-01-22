const router = require('express').Router()

const postController = require('./controllers/postController')
const authController = require('./controllers/authController')
const chatController = require('./controllers/chatController')
const imageController = require('./controllers/imageController')
const errorController = require('./controllers/errorController.js')

router.use('/posts', postController)
router.use('/users', authController)
router.use('/chat', chatController)
router.use('/images', imageController)

router.use('*', errorController)

module.exports = router