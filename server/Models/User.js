const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image: String,
    ownPosts: {
        type: Array,
        references: [{ type: Object, ref: 'Post' }]
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    },
    location: String,
    savedPosts: {
        type: Array,
        references: [{ type: Object, ref: 'Post' }]
    },
    savedTrainings: {
        type: Array,
        references: [{ type: Object, ref: 'Training' }]
    },
    chat: {
        type: Array,
        references: [{ type: Object, ref: 'Chat' }]
    },
    releasedDate: String
})

const User = mongoose.model('User', userSchema)

exports.User = User