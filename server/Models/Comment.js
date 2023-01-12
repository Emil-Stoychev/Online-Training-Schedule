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
    image: Array,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    profileImage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    nestedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    option: {
        type: String,
        enum: ['main', 'nested'],
        default: 'main'
    },
    date: Date
})

const Comment = mongoose.model('Comment', commentSchema)

exports.Comment = Comment