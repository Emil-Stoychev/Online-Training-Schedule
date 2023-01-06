const router = require('express').Router()

const postController = require('./controllers/postController')
const authController = require('./controllers/authController')
const errorController = require('./controllers/errorController.js')

router.use('/posts', postController)
router.use('/users', authController)

router.use('*', errorController)

module.exports = router