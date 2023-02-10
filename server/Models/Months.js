const mongoose = require('mongoose')

const monthsSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    month: String,
    yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Days' }]
},
    { timestamps: true },
)

const Month = mongoose.model('Month', monthsSchema)

exports.Month = Month