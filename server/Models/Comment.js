const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    authorId: {
        type: String,
        required: [true, 'AuthorId is required'],
    },
    postId: {
        type: String,
        required: [true, 'PostId is required'],
    },
    profileImage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    nestedComments: Array,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    date: String
})

const Comment = mongoose.model('Comment', commentSchema)

exports.Comment = Comment