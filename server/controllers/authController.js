const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../Middlewares/authMiddleware')

const authService = require('../Services/authService')
const { getAllFilteredByIds } = require('../Services/postService')



router.get('/', authMiddleware, async (req, res) => {
    res.json(await authService.getAll())
})

router.get('/:token/:userId', authMiddleware, async (req, res) => {
    if (req.params.userId != 'undefined' && req.params.userId != undefined) {
        res.json(await authService.getUserById(req.params.userId))
    } else {
        res.json(await authService.getUserById(req.params.user?._id))
    }
})

router.get('/getAllNotifications/:userId/:token/:skipNum', authMiddleware, async (req, res) => {
    res.json(await authService.getAllNotifications(req.params.userId, req.params.skipNum))
})

router.get('/getAllNotificationsNumber/:userId/:token', authMiddleware, async (req, res) => {
    res.json(await authService.getAllNotificationsNumber(req.params.userId))
})

router.post('/readAllNotifications', async (req, res) => {
    await authService.readAllNotifications(req.body.userId)
})

router.get('/getUserByUsernames/:token/:searchValue', authMiddleware, async (req, res) => {
    res.json(await authService.getUserByUsernames(req.params.searchValue))
})

router.get('/own/:token/:option/:userId', authMiddleware, async (req, res) => {
    let result = await authService.getByOption(req.params?.userId, req.params.option, req.params.user._id)

    result.length > 0 ? res.json(result) : res.json({ message: "Empty!" })
})

router.get('/toggleFollow/:token/:userId', authMiddleware, async (req, res) => {
    res.json(await authService.toggleFollowPerson(req.params.userId, req.params.user?._id))
})

router.put('/editProfile/:userId', authMiddleware, async (req, res) => {
    let updatedUser = await authService.editProfile(req.body)

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

router.delete('/deleteAccount/:token', authMiddleware, async (req, res) => {
    let deletedAccount = await authService.deleteAcc(req.body.password, req.params.user._id)

    res.json(deletedAccount)
})

module.exports = router