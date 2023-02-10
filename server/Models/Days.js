const mongoose = require('mongoose')

const daysSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    day: String,
    yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    monthId: { type: mongoose.Schema.Types.ObjectId, ref: 'Months' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DaysEvents' }]
},
    { timestamps: true },
)

const Day = mongoose.model('Day', daysSchema)

exports.Day = Day