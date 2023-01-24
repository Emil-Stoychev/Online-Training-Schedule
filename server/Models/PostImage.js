const mongoose = require('mongoose')

const PostImageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
        type: String
    },
    thumbnail: {
        type: String
    },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
},
    { timestamps: true },
)

const PostImage = mongoose.model('PostImage', PostImageSchema)

exports.PostImage = PostImage