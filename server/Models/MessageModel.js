const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    }
},
    { timestamps: true },
)

const MessageModel = mongoose.model('Message', MessageSchema)

exports.MessageModel = MessageModel