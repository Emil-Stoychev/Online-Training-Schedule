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
    ownPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    trainings: {
        type: Array,
        references: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainings' }]
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    },
    location: String,
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedTrainings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Training' }],
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    releasedDate: String
})

const User = mongoose.model('User', userSchema)

exports.User = User