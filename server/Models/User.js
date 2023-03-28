const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verification: String,
    image: String,
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    ownPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    trainings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingPrograms' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: String,
    soundNotification: {
        type: Boolean,
        default: true
    },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedTrainings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingPrograms' }],
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
    releasedDate: String
})

const User = mongoose.model('User', userSchema)

exports.User = User