const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    container: {
        type: Array,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visible: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'public'
    },
    savedCount: {
        type: Array
    },
    // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingImage' }]
})

const TrainingPrograms = mongoose.model('TrainingPrograms', trainingSchema)

exports.TrainingPrograms = TrainingPrograms