const { MessageModel } = require("../Models/MessageModel")

const addMessage = async (chatId, senderId, text) => {
    const message = new MessageModel({
        chatId,
        senderId,
        text
    })
    try {
        return await message.save()
    } catch (error) {
        console.error(error)
        return error
    }
}

const getMessages = async (chatId) => {
    try {
        return await MessageModel.find({ chatId })
    } catch (error) {
        console.error(error)
        return error
    }
}


module.exports = {
    addMessage,
    getMessages
}