const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    // author: String,
    // from: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // messages: Array,
    // date: String,
})

const Chat = mongoose.model('Chat', chatSchema)

exports.Chat = Chat