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
    trainings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingPrograms' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: String,
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedTrainings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingPrograms' }],
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
    releasedDate: String
})

const User = mongoose.model('User', userSchema)

exports.User = User