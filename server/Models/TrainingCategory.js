const mongoose = require('mongoose')

const TrainingCategorySchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
        type: String,
    }
},
    { timestamps: true },
)

const TrainingCategory = mongoose.model('TrainingCategory', TrainingCategorySchema)

exports.TrainingCategory = TrainingCategory