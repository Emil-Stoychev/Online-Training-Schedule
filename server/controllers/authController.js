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

router.get('/profile/:profileId', async (req, res) => {
    res.json(await authService.getUserById(req.params.profileId))
})

router.get('/own/:token/:option', authMiddleware, async (req, res) => {
    let result = await authService.getByOption(req.params?.user?._id, req.params.option)

    result.length > 0 ? res.json(result) : res.json({ message: "Empty!" })
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