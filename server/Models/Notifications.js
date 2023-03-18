const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    read: {
        type: Boolean,
        default: false
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingPrograms' },
},
    { timestamps: true },
)

const Notification = mongoose.model('Notification', notificationSchema)

exports.Notification = Notification