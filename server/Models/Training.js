const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    container: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCnt' }],
    mainTitle: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visible: {
        type: String,
        enum: ['Public', 'Friends', 'Private'],
        default: 'Public'
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCategory' },
    buyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    payment: {
        type: Boolean,
        default: false
    },
    price: Number,
    currency: {
        type: String,
        enum: ['BGN', 'EURO', 'USD'],
        default: 'BGN'
    }
},
    { timestamps: true },
)

const TrainingPrograms = mongoose.model('TrainingPrograms', trainingSchema)

exports.TrainingPrograms = TrainingPrograms