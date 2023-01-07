const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../Middlewares/authMiddleware')

const authService = require('../Services/authService')
const { getAllFilteredByIds } = require('../Services/postService')



router.get('/', authMiddleware, async (req, res) => {
    res.json(await authService.getAll())
})

router.get('/:token', authMiddleware, async (req, res) => {
    res.json(await authService.getUserById(req.params.user))
})

router.get('/ownPosts/:userId', authMiddleware, async (req, res) => {
    let user = await authService.getUserById(req.params.userId)

    let ownPosts = await getAllFilteredByIds(user.ownPosts)

    ownPosts.length > 0 ? res.json(ownPosts) : res.json({ message: "Empty!" })
})

router.put('/changePicture/:userId', authMiddleware, async (req, res) => {
    let updatedUser = await authService.updatePicture(req.body)

    res.json(updatedUser)
})

router.post('/login', async (req, res) => {
    let result = await authService.login(req.body)

    res.json(result)
})

router.post('/register', async (req, res) => {
    let registereduser = await authService.register(req.body)

    res.json(registereduser)
})

router.get('/logout/:token', (req, res) => {
    authService.logout(req.params.token)

    res.json({ message: "Successfully logout!" })
})

router.delete('/deleteAccount/:userId', authMiddleware, async (req, res) => {
    let deletedAccount = await authService.deleteAccount(req.body)

    res.json(deletedAccount)
})

module.exports = router