const { Chat } = require("../Models/Chat.js")
const { MessageModel } = require("../Models/MessageModel")

const createChat = async (senderId, receiverId) => {

    let currChat = await findChat(senderId, receiverId)

    if (currChat) {
        return { message: 'This chat already exist!' }
    }

    const newChat = new Chat({
        members: [senderId, receiverId]
    })

    try {
        return await newChat.save()
    } catch (error) {
        console.error(error)
        return error
    }
}

const userChats = async (userId) => {
    try {
        const chat = await Chat.find({ members: { $in: [userId] } })
            .populate('members', ['image', 'username', 'location'])

        return chat
    } catch (error) {
        console.error(error)
        return error
    }
}

const findChat = async (firstId, secondId) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] }
        })

        return chat
    } catch (error) {
        console.error(error)
        return error
    }
}

const addMessage = async (chatId, senderId, text, image) => {
    const message = new MessageModel({
        chatId,
        senderId,
        text,
        image
    })
    try {
        return await message.save()
    } catch (error) {
        console.error(error)
        return error
    }
}

const getMessages = async (chatId, skipNumber) => {
    try {
        let result = await MessageModel.find({ chatId })
            .sort({ createdAt: -1 })
            .skip(skipNumber)
            .limit(10)

        return result.reverse()
    } catch (error) {
        console.error(error)
        return error
    }
}


module.exports = {
    createChat,
    userChats,
    findChat,
    addMessage,
    getMessages
}