const mongoose = require('mongoose')

const TrainingCntSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: String,
    option: String,
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingImage' }]
},
    { timestamps: true },
)

const TrainingCnt = mongoose.model('TrainingCnt', TrainingCntSchema)

exports.TrainingCnt = TrainingCnt