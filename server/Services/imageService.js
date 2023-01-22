const { Image } = require("../Models/Image.js")
const sharp = require("sharp");

const createImage = async (author, image) => {

    const buffer = Buffer.from(image.split(";base64,").pop(), "base64");

    return sharp(buffer)
        .resize(120, 120, { fit: "inside" })
        .toBuffer()
        .then(async (thumbnail) => {
            return await Image.create({
                image,
                thumbnail: `data:image/jpeg;base64,${thumbnail.toString("base64")}`,
                author,
            });
        });
}

const getFullImage = async (imageId) => {
    return await Image.findById(imageId)
}

module.exports = {
    createImage,
    getFullImage
}