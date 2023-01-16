const { Chat } = require("../Models/Chat.js")

const createChat = async (senderId, receiverId) => {
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


module.exports = {
    createChat,
    userChats,
    findChat
}