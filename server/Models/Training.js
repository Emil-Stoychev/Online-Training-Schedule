const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    container: {
        type: Array,
    },
    author: String,
    username: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visible: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'public'
    },
    savedCount: {
        type: Array
    }
})

const TrainingPrograms = mongoose.model('TrainingPrograms', trainingSchema)

exports.TrainingPrograms = TrainingPrograms