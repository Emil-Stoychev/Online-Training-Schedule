const router = require('express').Router()

const { authMiddleware } = require('../Middlewares/authMiddleware')
const postService = require('../Services/postService')

router.get('/:pageNum', async (req, res) => {
    let posts = await postService.getAll(req.params.pageNum)

    res.json(posts.length > 0 ? posts : { message: "Empty" })
})

router.post('/create', authMiddleware, async (req, res) => {
    let createdProduct = await postService.create(req.body, req.params.user) || []

    res.json(createdProduct)
})

router.delete('/deletePost/:postId', authMiddleware, async (req, res) => {
    let deletedPost = await postService.delete(req.params.postId, req.params.user._id) || { message: "404 Not found!" }

    res.json(deletedPost)
})

router.post('/toggleLikePost/:postId', authMiddleware, async (req, res) => {
    let result = await postService.toggleLikePost(req.params.postId, req.params.user._id) || []

    res.json(result)
})

router.post('/toggleSavePost/:postId', authMiddleware, async (req, res) => {
    let result = await postService.toggleSavePost(req.params.postId, req.params.user._id) || []

    res.json(result)
})

router.post('/addComment', async (req, res) => {
    let addedComment = await postService.addComment(req.body) || { message: "404 Not found!" }

    res.json(addedComment)
})

router.get('/getComments/:postId/:token', authMiddleware, async (req, res) => {
    let resComments = await postService.getComments(req.params.postId) || { message: "404 Not found!" }

    res.json(resComments)
})

router.get('/getNestedComments/:postId/:commentId/:token', authMiddleware, async (req, res) => {
    let resComments = await postService.getNestedComments(req.params.postId, req.params.commentId) || { message: "404 Not found!" }

    res.json(resComments)
})

router.post('/likeComment/:commentId', authMiddleware, async (req, res) => {
    let editedComment = await postService.likeComment(req.params.commentId, req.params.user._id) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/editComment/:commentId', authMiddleware, async (req, res) => {
    let editedComment = await postService.editComment(req.body.commentValue, req.params.commentId, req.params.user._id) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.delete('/deleteComment/:commentId/:parentId', authMiddleware, async (req, res) => {
    let deletedComment = await postService.deleteComment(req.params.commentId, req.params.user._id, req.params.parentId) || { message: "404 Not found!" }

    res.json(deletedComment)
})

router.post('/addReplyComment/:commentId', authMiddleware, async (req, res) => {
    let editedComment = await postService.addReplyComment(
        req.body.commentValue, req.body.image, req.params.commentId, req.body.userId, req.body.postId, req.params.user.username
    ) || { message: "404 Not found!" }

    res.json(editedComment)
})







router.put('/edit/:productId', async (req, res) => {
    let editedProduct = await postService.edit(req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})



router.delete('/deleteComment/:commentId', async (req, res) => {
    let deletedComment = await postService.deleteComment(req.params.commentId, req.body) || { message: "404 Not found!" }

    res.json(deletedComment)
})

router.delete('/deleteNestedComment/:commentId', async (req, res) => {
    let deletedComment = await postService.deleteNestedComment(req.body) || { message: "404 Not found!" }

    res.json(deletedComment)
})

router.put('/addProductLikes/:productId', async (req, res) => {
    let editedProduct = await postService.addLikes(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/removeProductLikes/:productId', async (req, res) => {
    let editedProduct = await postService.removeLikes(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/changeProductAuthor/:productId', async (req, res) => {
    let editedProduct = await postService.changeProductAuthor(req.params.productId, req.body.cookie) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.put('/changeProductStatus/:productId', async (req, res) => {
    let editedProduct = await postService.changeProductStatus(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.get('/details/:postId/:token', authMiddleware, async (req, res) => {
    let detailsPost = await postService.getById(req.params.postId) || { message: "404 Not found!" }

    res.json(detailsPost)
})

module.exports = router