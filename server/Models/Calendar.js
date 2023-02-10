const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    year: String,
    months: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Months' }]
},
    { timestamps: true },
)

const Calendar = mongoose.model('Calendar', calendarSchema)

exports.Calendar = Calendar