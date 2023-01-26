const router = require('express').Router()

const { authMiddleware } = require('../Middlewares/authMiddleware')
const trainingService = require('../Services/trainingService')

// router.get('/', async (req, res) => {
//     let posts = await trainingService.getAll(req.params.pageNum)

//     res.json(posts.length > 0 ? posts : { message: "Empty" })
// })

router.post('/create', authMiddleware, async (req, res) => {
    let createdProgram = await trainingService.create(req.body.data.container, req.body.data.category, req.params?.user?._id) || []

    res.json(createdProgram)
})



module.exports = router