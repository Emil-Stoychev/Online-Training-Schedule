const { authMiddleware } = require('../Middlewares/authMiddleware')
const { Post } = require('../Models/Post')
const { Comment } = require('../Models/Comment')
const { addCommentService, editCommentService, addReplyCommentService } = require('../utils/CommentEngine')
const { productValidator } = require('../utils/postValidator')
const { checkUserExisting, getUserById, addNewPostToUser } = require('./authService')

const getAll = async (pageNum) => {
    try {
        return await Post.find({ $or: [{ visible: 'Public' }, { visible: 'Friends' }] })
            .sort('-createdOn')
            .limit(10)
            .skip(pageNum)
            .populate('profileImage', ['image', 'username', 'location'])

    } catch (error) {
        console.error(error)
        return error
    }
}

const getAllFilteredByIds = async (ids) => {
    try {

        return await Product.find({ _id: ids })
    } catch (error) {
        console.error(error)
        return error
    }
}

const getById = async (postId) => {
    try {
        let currPost = await Post.findById(postId)
            .populate('profileImage', ['image', 'username', 'location'])
            || { message: "404 Not found!" }

        // let comments = await Comment.find()

        // product.comments = await Comment.find({ _id: product.comments })

        // product.comments = product.comments.map(x => {
        //     if (x.nestedComments.length > 0) {
        //         x.nestedComments = comments.map(y => {
        //             if (x.nestedComments.includes(y._id.toString())) {
        //                 return y
        //             }
        //         })
        //     }

        //     x.nestedComments = x.nestedComments.filter(x => x != null)

        //     return x
        // })

        return currPost
    } catch (error) {
        return error
    }
}

const getComments = async (id) => {
    try {
        let allComments = await Comment.find({ postId: id })
            .populate('profileImage', ['image', 'username', 'location'])

        return allComments
    } catch (error) {
        return error
    }
}

const addComment = async (data) => {
    let { description, image, userId, postId } = data

    try {
        let isUserExist = await getUserById(userId)

        if (!isUserExist.username) {
            return { message: "User doesn't exist!" }
        }

        let newComment = await addCommentService(isUserExist?.username, description, image, userId, postId)

        let post = await Post.findById(postId)

        if (!post._id) {
            return { message: "Post not found!" }
        }

        post.comments.push(newComment._id)

        post.save()

        let resComment = await Comment.findById(newComment._id)
            .populate('profileImage', ['image', 'username', 'location'])

        return resComment
    } catch (error) {
        return error
    }
}

const editComment = async (commentValue, commentId, userId) => {
    try {
        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId != userId) {
            return { message: "You cannot change this comment!" }
        }

        if (commentValue.trim() == '' || commentValue.length < 3) {
            return { message: "Comment must be at least 3 character!" }
        }

        isCommentExist.description = commentValue

        isCommentExist.save()

        return isCommentExist
    } catch (error) {
        return error
    }
}

const likeComment = async (commentId, userId) => {
    try {
        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId == userId) {
            return { message: "You cannot like this comment!" }
        }

        if (isCommentExist.likes.includes(userId)) {
            isCommentExist.likes = isCommentExist.likes.filter(x => x != userId)
        } else {
            isCommentExist.likes.push(userId)
        }

        isCommentExist.save()

        return isCommentExist
    } catch (error) {
        return error
    }
}

const addReplyComment = async (commentValue, image, commentId, userId, postId, username) => {
    try {
        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        let comment = {
            username,
            description: commentValue,
            image,
            authorId: userId,
            postId,
            profileImage: userId,
            date: new Date()
        }

        let newComment = await Comment.create(comment)

        isCommentExist.nestedComments.push(newComment._id)

        isCommentExist.save()

        let resComment = await Comment.findById(newComment._id)
            .populate('profileImage', ['image', 'username', 'location'])

        return resComment
    } catch (error) {
        return error
    }
}

const deleteComment = async (commentId, userId, parentId) => {
    try {
        let isCommentExist = await Comment.findById(commentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId != userId) {
            return { message: "You cannot delete this comment!" }
        }

        let deletedComment = await Comment.findByIdAndDelete(commentId)

        if (parentId != undefined) {
            await Comment.deleteMany({ _id: isCommentExist.nestedComments })

            let post = await Post.findById(isCommentExist.postId)

            post.comments = post.comments.filter(x => x != commentId)

            post.save()
        } else {
            let parentComment = await Comment.findById(parentId)

            parentComment.nestedComments = parentComment.nestedComments.filter(x => x != commentId)

            parentComment.save()
        }

        return deletedComment
    } catch (error) {
        return error
    }
}

const deleteNestedComment = async (data) => {
    let { nestedCommentId, cookie, parentId } = data

    try {
        let isCommentExist = await Comment.findById(nestedCommentId)

        if (!isCommentExist) {
            return { message: "This comment doesn't exist!" }
        }

        if (isCommentExist.authorId != cookie._id) {
            return { message: "You cannot delete this comment!" }
        }

        let deletedComment = await Comment.findByIdAndDelete(nestedCommentId)

        let parentComment = await Comment.findById(parentId)

        parentComment.nestedComments = parentComment.nestedComments.filter(x => x != nestedCommentId)

        parentComment.save()

        return deletedComment
    } catch (error) {
        return error
    }
}

const changePostStatus = async (productId, data) => {
    try {
        if (!data.token) {
            return { message: "User doesn't exist!" }
        }

        let token = await authMiddleware(data.token)

        if (token.message) {
            return token
        }

        if (blackList.has(data.token)) {
            return { message: "Invalid access token!" }
        }

        let product = await Product.findById(productId)

        product.visible = !product.visible
        product.save()

        return product
    } catch (error) {
        return error
    }
}

const create = async (data, user) => {
    try {
        let userInfo = await getUserById(user._id)

        if (userInfo.message) {
            return userInfo
        }

        let dataForCreation = productValidator(data.values, user)

        if (dataForCreation.message) {
            return dataForCreation
        }

        let createdProduct = await Post.create(dataForCreation)

        let updatedUser = await addNewPostToUser(user, createdProduct._id)

        if (updatedUser.message) {
            return updatedUser
        }

        let currPost = await Post.findById(createdProduct._id)
            .populate('profileImage', ['image', 'username', 'location'])

        return currPost
    } catch (error) {
        console.error(error)
        return error
    }
}

const edit = async (data) => {
    let { productId, productValues, cookie } = data

    try {
        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(cookie.token)

        if (token.message) {
            return token
        }

        if (blackList.has(cookie.token)) {
            return { message: "Invalid access token!" }
        }

        let user = await getUserById(cookie._id)

        if (!user.email) {
            return { meessage: "User not found!" }
        }

        let product = await Product.findById(productId)

        if (!product) {
            return { message: "404 Not found!" }
        }

        if (product.author != data.cookie._id) {
            return { message: "You cannot change this product!" }
        }

        let dataForEditing = productValidator(productValues)

        if (dataForEditing.message) {
            return dataForEditing
        }

        let editedProduct = await Product.findByIdAndUpdate(productId, dataForEditing)

        await addMessageAfterEditing(cookie._id, editedProduct, cookie.token)

        return editedProduct
    } catch (error) {
        console.error(error)
        return error
    }
}

const toggleLikePost = async (postId, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user.username) {
            return { message: "User doesn't exist!" }
        }

        let post = await Post.findById(postId)

        if (!post) {
            return { message: "404 Not found!" }
        }

        if (post.author == userId) {
            return { message: "You cannot like this post!" }
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(x => x != userId)
        } else {
            post.likes.push(userId)
        }

        post.save()

        return post
    } catch (error) {
        console.error(error)
        return error
    }
}

const toggleSavePost = async (postId, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user.username) {
            return { message: "User doesn't exist!" }
        }

        let post = await Post.findById(postId)

        if (!post) {
            return { message: "404 Not found!" }
        }

        if (post.author == userId) {
            return { message: "You cannot save this post!" }
        }

        if (post.saved.includes(userId)) {
            post.saved = post.saved.filter(x => x != userId)
            user.savedPosts = user.savedPosts.filter(x => x != postId)
        } else {
            post.saved.push(userId)
            user.savedPosts.push(postId)
        }

        post.save()
        user.save()

        return post
    } catch (error) {
        console.error(error)
        return error
    }
}

const del = async (productId, data) => {
    let { cookie } = data

    try {
        if (data.cookie.message) {
            return { message: "Invalid access token!" }
        }

        let token = await authMiddleware(data.cookie.token)

        if (token.message) {
            return token
        }

        if (blackList.has(data.cookie.token)) {
            return { message: "Invalid access token!" }
        }

        let user = getUserById(cookie._id)

        if (user.message) {
            return user
        }

        let product = await Product.findById(productId)

        if (!product) {
            return { message: "404 Not found!" }
        }

        if (product.author != data.cookie._id) {
            return { message: "You cannot change this product!" }
        }

        await Comment.deleteMany({ productId: product._id.toString() })

        let deletedProduct = await Product.findByIdAndDelete(productId)

        let updatedUser = await updateUserAfterDeleteProduct(cookie._id, product)

        if (updatedUser.message) {
            return updatedUser
        }

        return deletedProduct
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = {
    getAll,
    create,
    getById,
    edit,
    delete: del,
    getAllFilteredByIds,
    changePostStatus,
    addComment,
    editComment,
    deleteComment,
    likeComment,
    addReplyComment,
    deleteNestedComment,
    toggleLikePost,
    toggleSavePost,
    getComments
}