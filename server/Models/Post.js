const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    images: {
        type: Array,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    visible: {
        type: String,
        enum: ['Public', 'Friends', 'Private'],
        default: 'Public'
    },
    profileImage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    savedCount: {
        type: Array
    },
},
    { timestamps: true },
)

const Post = mongoose.model('Post', postSchema)

exports.Post = Post