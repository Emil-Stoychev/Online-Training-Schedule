const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
        type: String
    },
    thumbnail: {
        type: String
    }
},
    { timestamps: true },
)

const Image = mongoose.model('Image', ImageSchema)

exports.Image = Image