const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../Middlewares/authMiddleware')

const calendarService = require('../Services/calendarService')

router.get('/', authMiddleware, async (req, res) => {
    res.json(await calendarService.getAll())
})

router.get('/:token/:year/:month', authMiddleware, async (req, res) => {
    res.json(await calendarService.initCalendar(req.params.year, req.params.month, req.params.user._id))
})

router.get('/:token/:year/:month/:day', authMiddleware, async (req, res) => {
    res.json(await calendarService.getCurrDay(req.params.year, req.params.month, req.params.day, req.params.user._id))
})

router.post('/createEvent/:token', authMiddleware, async (req, res) => {
    let result = await calendarService.createEvent(req.body.container, req.body.year, req.body.month, req.body.day, req.params.user._id)

    return res.status(200).json(result)
})

router.post('/toggleFinishEvent/:eventId', authMiddleware, async (req, res) => {
    let result = await calendarService.toggleFinishEvent(req.params.eventId, req.body.finish, req.params.user._id)

    return res.status(200).json(result)
})

router.delete('/deleteEvent/:eventId', authMiddleware, async (req, res) => {
    let result = await calendarService.deleteEvent(req.params.eventId, req.params.user._id)

    return res.status(200).json(result)
})


module.exports = router
