const router = require('express').Router()

const postService = require('../Services/postService')

router.get('/', async (req, res) => {
    let products = await postService.getAll()

    res.json(products.length > 0 ? products : { message: "Empty" })
})

router.post('/create', async (req, res) => {
    let createdProduct = await postService.create(req.body) || []

    res.json(createdProduct)
})

router.put('/edit/:productId', async (req, res) => {
    let editedProduct = await postService.edit(req.body) || { message: "404 Not found!" }

    res.json(editedProduct)
})

router.post('/addComment', async (req, res) => {
    let addedComment = await postService.addComment(req.body) || { message: "404 Not found!" }

    res.json(addedComment)
})

router.put('/editComment/:commentId', async (req, res) => {
    let editedComment = await postService.editComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/addReplyComment/:commentId', async (req, res) => {
    let editedComment = await postService.addReplyComment(req.body) || { message: "404 Not found!" }

    res.json(editedComment)
})

router.put('/likeComment/:commentId', async (req, res) => {
    let editedComment = await postService.likeComment(req.params.commentId, req.body) || { message: "404 Not found!" }

    res.json(editedComment)
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

router.delete('/delete/:productId', async (req, res) => {
    let deletedProduct = await postService.delete(req.params.productId, req.body) || { message: "404 Not found!" }

    res.json(deletedProduct)
})

router.get('/details/:productId', async (req, res) => {
    let detailsProduct = await postService.getById(req.params.productId) || { message: "404 Not found!" }

    res.json(detailsProduct)
})

module.exports = router