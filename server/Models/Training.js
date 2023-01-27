const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    container: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCnt' }],
    mainTitle: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visible: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'public'
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCategory' },
},
    { timestamps: true },
)

const TrainingPrograms = mongoose.model('TrainingPrograms', trainingSchema)

exports.TrainingPrograms = TrainingPrograms