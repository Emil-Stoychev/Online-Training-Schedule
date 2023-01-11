const { Comment } = require('../Models/Comment')

const addCommentService = async (username, description, image, authorId, postId) => {

    let comment = {
        username,
        description,
        image,
        authorId,
        postId,
        profileImage: authorId,
        date: new Date()
    }

    let newComment = await Comment.create(comment)

    return newComment
}

const addReplyCommentService = async (commentValue, isCommentExist, cookie) => {
    
    let comment = {
        username,
        description,
        image,
        authorId,
        postId,
        profileImage: authorId,
        date: new Date()
    }

    let newComment = await Comment.create(comment)

    isCommentExist.nestedComments.push(newComment._id.toString())

    isCommentExist.save()

    return newComment
}

module.exports = {
    addCommentService,
    addReplyCommentService
}