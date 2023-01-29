const router = require('express').Router()

const { authMiddleware } = require('../Middlewares/authMiddleware')
const trainingService = require('../Services/trainingService')

router.get('/:trainingId', async (req, res) => {
    let trainingProgram = await trainingService.getById(req.params.trainingId)

    res.json(trainingProgram?._id ? trainingProgram : { message: "Empty" })
})

router.get('/fastInfo/:trainingId', async (req, res) => {
    let trainingProgram = await trainingService.getFastInfoAboutProgram(req.params.trainingId)

    res.json(trainingProgram?._id ? trainingProgram : { message: "Empty" })
})

router.get('/fullImage/:imageId', async (req, res) => {
    let fullImage = await trainingService.getFullImage(req.params.imageId)

    res.json(fullImage?._id ? fullImage : { message: "Empty" })
})

router.post('/create', authMiddleware, async (req, res) => {
    let createdProgram = await trainingService.create(req.body.data.mainInputTitle, req.body.data.container, req.body.data.category, req.params?.user?._id) || []

    res.json(createdProgram)
})

router.post('/toggleLike/:trainingId', authMiddleware, async (req, res) => {
    let toggleLikeProgram = await trainingService.toggleLike(req.params.trainingId, req.params?.user?._id) || []

    res.json(toggleLikeProgram)
})

router.delete('/delete/:trainingId', authMiddleware, async (req, res) => {
    let deletedProgram = await trainingService.deleteProgram(req.params.trainingId, req.params.user?._id) || { message: "404 Not found!" }

    res.json(deletedProgram)
})



router.get('/categories/:author', async (req, res) => {
    let categories = await trainingService.getAllCategories(req.params.author)

    res.json(categories?.length > 0 ? categories : { message: "Empty" })
})

router.get('/trainingsByCategory/:categoryId', async (req, res) => {
    let categories = await trainingService.getTrainingsByCategory(req.params.categoryId)

    res.json(categories?.length > 0 ? categories : { message: "Empty" })
})

router.post('/editCategoryName/:categoryId', authMiddleware, async (req, res) => {
    let editedCategory = await trainingService.editCategoryName(req.params.categoryId, req.params?.user?._id, req.body.value) || []

    res.json(editedCategory)
})

router.delete('/deleteCategory/:categoryId', authMiddleware, async (req, res) => {
    let deletedProgram = await trainingService.deleteCategory(req.params.categoryId, req.params.user?._id) || { message: "404 Not found!" }

    res.json(deletedProgram)
})

module.exports = router