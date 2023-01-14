const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../Models/User')
const { userValidator, editUserValidator } = require('../utils/userValidator')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

const getUserById = async (userId) => {
    try {
        let userAcc = await User.findById(userId)

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

const removeSavedIdsAfterDeletingPost = async (ids, postId) => {
    try {
        let allUsers = await User.find({ _id: [...ids] })

        allUsers.forEach(x => {
            x.savedPosts = x?.savedPosts?.filter(x => x != postId)

            x.save()
        })
    } catch (error) {
        console.error(error)
        return error
    }
}

const removePostAfterDeletingPost = async (userId, postId) => {
    try {
        let user = await User.findById(userId)

        user.ownPosts = user?.ownPosts?.filter(x => x != postId)

        user.save()

        return user
    } catch (error) {
        console.error(error)
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

        return { message: 'yes', token: result, _id: user?._id }
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

const toggleFollowPerson = async (userId, ownId) => {
    try {
        let targetUser = await getUserById(userId)
        let myUser = await getUserById(ownId)

        if (!targetUser.username || !myUser.username) {
            return { message: "User doesn't exist!" }
        }

        if (targetUser.followers.includes(ownId)) {
            targetUser.followers = targetUser.followers.filter(x => x != ownId)
            myUser.following = myUser.following.filter(x => x != userId)
        } else {
            targetUser.followers.push(ownId)
            myUser.following.push(userId)
        }

        targetUser.save()
        myUser.save()

        return targetUser.followers
    } catch (error) {
        console.error(error)
        return error
    }
}

const editProfile = async (data) => {
    try {
        let { values, userId } = data

        let user = await User.findById(userId)

        if (!user) {
            return { message: "User not found!" }
        }

        let newUser = await User.findOne({ username: values.username })

        if (newUser != null && user.username != newUser.username) {
            return { message: "User already exist!" }
        }

        let oldPass = await bcrypt.compare(values.password, user?.password)

        if (!oldPass) {
            return { message: "Wrong password!" }
        }

        let userIsValid = editUserValidator(values)

        if (userIsValid.message) {
            return userIsValid
        }

        let hashedPassword = await bcrypt.hash(userIsValid.password, 10)

        user.username = values.username
        user.password = hashedPassword
        user.location = values.location
        user.image = values.image

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

const deleteAcc = async (password, userId) => {
    try {
        if (!password || password.length < 3 || password.trim() === '') {
            return { message: 'Password must be at least 3 characters!' }
        }

        let user = await User.findById(userId)

        if (!user) {
            return { message: "User not found!" }
        }

        let isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return { message: "Wrong password!" }
        }

        let allUsersIds = new Set(...[user?.following], ...[user.followers])

        console.log(allUsersIds);

        // await User.findByIdAndDelete(userId)

        return {}
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = {
    login,
    register,
    getUserById,
    getAll,
    checkUserExisting,
    editProfile,
    addNewPostToUser,
    getByOption,
    toggleFollowPerson,
    removeSavedIdsAfterDeletingPost,
    removePostAfterDeletingPost,
    deleteAcc
}