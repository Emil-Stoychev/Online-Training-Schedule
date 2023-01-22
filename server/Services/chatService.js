const { Chat } = require("../Models/Chat.js")
const { MessageModel } = require("../Models/MessageModel")
const { createImage } = require("./imageService.js")

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

    let imageData

    if (image) {
        imageData = await createImage(senderId, image)
    }

    const message = new MessageModel({
        chatId,
        senderId,
        text,
        image: imageData?._id || undefined
    })

    let newMessage = await message.save()

    try {

        return await MessageModel.findById(newMessage._id)
            .populate('image', ['thumbnail'])
    } catch (error) {
        console.error(error)
        return error
    }
}

const getMessages = async (chatId, skipNumber) => {
    try {
        let result = await MessageModel.find({ chatId })
            .populate('image', ['thumbnail'])
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