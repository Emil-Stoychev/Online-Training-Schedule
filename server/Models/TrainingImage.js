const mongoose = require('mongoose')

const TrainingImageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
        type: String
    },
    thumbnail: {
        type: String
    },
    parentId: String
},
    { timestamps: true },
)

const TrainingImage = mongoose.model('TrainingImage', TrainingImageSchema)

exports.TrainingImage = TrainingImage