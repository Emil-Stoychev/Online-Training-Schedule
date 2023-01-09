const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { authMiddleware } = require('../Middlewares/authMiddleware')

const { User } = require('../Models/User')
const { Comment } = require('../Models/Comment')
const { Post } = require('../Models/Post')
const { Chat } = require('../Models/Chat')
const { userValidator } = require('../utils/userValidator')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

const getUserById = async (userId) => {
    try {
        let userAcc = await User.findById(userId).populate('ownPosts')

        if (!userAcc) {
            return { message: "User doesn't exist!" }
        }

        return userAcc
    } catch (error) {
        return error
    }
}

const getByOption = async (userId, option) => {
    try {
        let filteredItems

        if (option == 'ownPosts') {
            filteredItems = await User.findById(userId).populate('ownPosts')

            return filteredItems.ownPosts
        } else if (option == 'trainings') {
            filteredItems = await User.findById(userId).populate('trainings')

            return filteredItems.trainings
        } else if (option == 'savedPosts') {
            filteredItems = await User.findById(userId).populate('savedPosts')

            return filteredItems.savedPosts
        } else if (option == 'savedTrainings') {
            filteredItems = await User.findById(userId).populate('savedTrainings')

            return filteredItems.savedTrainings
        } else if (option == 'followers') {
            filteredItems = await User.findById(userId).populate('followers')

            return filteredItems.followers
        } else if (option == 'following') {
            filteredItems = await User.findById(userId).populate('following')

            return filteredItems.following
        }
    } catch (error) {
        return error
    }
}

const checkUserExisting = async (username) => {
    try {
        return await User.findOne({ username })
    } catch (error) {
        return error
    }
}

const getAll = async () => {
    return await User.find()
}

const login = async (data) => {
    try {
        let { username, password } = data

        let user = await User.findOne({ username })

        if (!user) {
            return { message: "Username or password don't match!" }
        }

        let isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return { message: "Username or password don't match!" }
        }

        let result = await new Promise((resolve, reject) => {
            jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return reject(err)
                }

                resolve(token)
            })
        })

        return { message: 'yes', cookie: result }
    } catch (error) {
        return error
    }
}

const register = async (data) => {
    try {
        let user = userValidator(data)

        if (user.message) {
            return user
        }

        let isExist = await User.findOne({ username: user.username })

        if (isExist) {
            return { message: "Username already exist!" }
        }

        let hashedPassword = await bcrypt.hash(user.password, 10)

        let newDate = new Date()
        let date = newDate.toLocaleString()

        let createdUser = {
            username: user.username,
            password: hashedPassword,
            image: user.image || '',
            ownPosts: [],
            followers: [],
            following: [],
            location: user.location || '',
            savedPosts: [],
            savedTrainings: [],
            chat: [],
            releasedDate: date
        }

        await User.create(createdUser)

        return { message: 'yes' }
    } catch (error) {
        return error
    }
}

const updatePicture = async (data) => {
    try {
        let { cookie, image } = data

        if (cookie.token.message) {
            return { message: "Invalid access token!" }
        }

        let isValidToken = await authMiddleware(cookie.token)

        if (isValidToken.message) {
            return isValidToken
        }

        let user = await User.findById(cookie._id)

        if (!user) {
            return { message: "User not found!" }
        }

        user.image = image
        user.save()

        return user
    } catch (error) {
        return error
    }
}


const addNewPostToUser = async (user, postId) => {
    try {
        let userInfo = await User.findById(user._id)

        if (!userInfo) {
            return { message: "User not found!" }
        }

        userInfo.ownPosts.push(postId)
        userInfo.save()

        return userInfo
    } catch (error) {
        return error
    }
}

module.exports = {
    login,
    register,
    getUserById,
    getAll,
    checkUserExisting,
    updatePicture,
    addNewPostToUser,
    getByOption
}