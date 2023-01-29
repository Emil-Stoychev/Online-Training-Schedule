const { authMiddleware } = require('../Middlewares/authMiddleware')
const { Post } = require('../Models/Post')
const { Comment } = require('../Models/Comment')
const { addCommentService } = require('../utils/CommentEngine')
const { postValidator } = require('../utils/postValidator')
const { checkUserExisting, getUserById, addNewPostToUser, removeSavedIdsAfterDeletingPost, removePostAfterDeletingPost } = require('./authService')

const getAll = async (pageNum) => {
    try {
        return await Post.find({ visible: 'Public' })
            .sort('-createdOn')
            .limit(10)
            .skip(pageNum)
            .populate('profileImage', ['image', 'username', 'location'])

    } catch (error) {
        console.error(error)
        return error
    }
}

const getAllFriendsPosts = async (pageNum, userId) => {
    try {
        let user = await getUserById(userId)

        let allIds = new Set(...[user?.following], ...[user.followers])

        return await Post.find({ author: { $in: [...allIds] }, $or: [{ visible: 'Public' }, { visible: 'Friends' }] })
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
        return currPost
    } catch (error) {
        return error
    }
}

const getComments = async (id) => {
    try {
        let allComments = await Comment.find({ postId: id, option: 'main' })
            .populate('profileImage', ['image', 'username', 'location'])

        return allComments
    } catch (error) {
        return error
    }
}

const getNestedComments = async (postId, commentId) => {
    try {
        let currComment = await Comment.findOne({ _id: commentId, postId, option: 'main' })
            .populate({
                path: 'nestedComments',
                populate: [{
                    path: 'profileImage',
                    select: ['username', 'image', 'location']
                }]
            })

        return currComment.nestedComments
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

        if (description.trim() == '' || description.length < 3) {
            return { message: "Comment must be at least 3 character!" }
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

        if (commentValue.trim() == '' || commentValue.length < 3) {
            return { message: "Comment must be at least 3 character!" }
        }

        let comment = {
            username,
            description: commentValue,
            image,
            authorId: userId,
            postId,
            profileImage: userId,
            option: 'nested',
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

        if (parentId == 'undefined' || parentId == undefined) {
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

        let dataForCreation = postValidator(data.values, user)

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

const edit = async (postValues, postId, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user) {
            return { meessage: "User not found!" }
        }

        let post = await Post.findById(postId)

        if (!post) {
            return { message: "404 Not found!" }
        }

        if (post.author != userId) {
            return { message: "You cannot change this post!" }
        }

        let dataForEditing = postValidator(postValues)

        if (dataForEditing.message) {
            return dataForEditing
        }

        let editedPost = await Post.findByIdAndUpdate(postId, dataForEditing)

        return postValues
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

const deletePost = async (postId, userId) => {
    try {
        let user = getUserById(userId)

        if (user.message) {
            return user
        }

        let post = await Post.findById(postId)

        if (!post) {
            return { message: "404 Not found!" }
        }

        if (post.author != userId) {
            return { message: "You cannot change this post!" }
        }

        await Comment.deleteMany({ postId })

        await removeSavedIdsAfterDeletingPost(post.saved, postId)

        let deletedPost = await Post.findByIdAndDelete(postId)

        await removePostAfterDeletingPost(userId, postId)

        return deletedPost
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
    deletePost,
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
    getComments,
    getNestedComments,
    getAllFriendsPosts
}