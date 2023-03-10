const mongoose = require('mongoose')

const dayEventSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    timeFrom: String,
    timeTo: String,
    finish: {
        type: Boolean,
        default: false
    },
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' }
},
    { timestamps: true },
)

const DayEvent = mongoose.model('DayEvent', dayEventSchema)

exports.DayEvent = DayEvent