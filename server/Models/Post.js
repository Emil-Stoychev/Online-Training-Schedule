const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    images: {
        type: Array,
    },
    author: String,
    username: String,
    likes: {
        type: Array,
        references: [{ type: Object, ref: 'User' }]
    },
    comments: {
        type: Array,
        ref: 'comments'
    },
    visible: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'public'
    },
    profileImage: {
        references: [{ type: Object, ref: 'User' }]
    },
    savedCount: {
        type: Array
    },
})

const Post = mongoose.model('Post', postSchema)

exports.Post = Post