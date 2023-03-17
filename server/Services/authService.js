const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sharp = require("sharp");
const shortid = require('shortid');

const { User } = require('../Models/User')
const { userValidator, editUserValidator } = require('../utils/userValidator');
const { addNotification } = require('../utils/notification');
const { sendEmail } = require('./emailService');

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

const getAllNotifications = async (userId) => {
    try {
        let userAcc = await User.findById(userId).populate({
            path: 'notifications',
            populate: { path: 'from', select: ['username', 'image'] },
        })

        if (!userAcc) {
            return { message: "User doesn't exist!" }
        }

        return userAcc.notifications.reverse()
    } catch (error) {
        return error
    }
}

const getUserByUsernames = async (searchValue) => {
    try {
        let users = await User.find({ username: { $regex: ("^" + searchValue) } })

        return users
    } catch (error) {
        return error
    }
}

const getAllUsersByIds = async (ids) => {
    try {
        return await User.find({ _id: { $in: [ids] } })
    } catch (error) {
        return error
    }
}

const getUserByIdInitCalendar = async (userId, year, month) => {
    try {
        let userAcc = await User.findById(userId).populate({
            path: 'calendar',
            match: { year },
            populate: {
                path: 'months',
                match: { month },
                model: 'Month',
                populate: {
                    path: 'days',
                    model: 'Day'
                }
            }
        })

        if (!userAcc) {
            return { message: "User doesn't exist!" }
        }

        return userAcc
    } catch (error) {
        return error
    }
}

const getUserByIdCalendarCurrDay = async (userId, year, month, day) => {
    try {
        let userAcc = await User.findById(userId).populate({
            path: 'calendar',
            match: { year },
            populate: {
                path: 'months',
                match: { month },
                model: 'Month',
                populate: {
                    path: 'days',
                    match: { day },
                    model: 'Day',
                    populate: {
                        path: 'events',
                        model: 'DayEvent'
                    }
                }
            }
        })

        if (!userAcc) {
            return { message: "User doesn't exist!" }
        }

        return userAcc
    } catch (error) {
        return error
    }
}

const addNewCalendarYearToUser = async (userId, calendarId) => {
    try {
        let userAcc = await User.findByIdAndUpdate({ _id: userId }, { $push: { calendar: calendarId } })

        if (!userAcc) {
            return { message: "User doesn't exist!" }
        }

        return userAcc
    } catch (error) {
        return error
    }
}

const getByOption = async (userId, option, tokenUserId) => {
    try {
        let filteredItems

        filteredItems = await User.findById(userId).populate(option)

        if (userId == tokenUserId) {
            filteredItems = await User.findById(userId).populate(option)
        } else {
            let user = await User.findById(userId)

            if (user.followers.includes(tokenUserId) || user.following.includes(tokenUserId)) {
                filteredItems = await User.findById(userId)
                    .populate({
                        path: option,
                        match: { visible: { $in: ['Public', 'Friends'] } }
                    })
            } else {
                filteredItems = await User.findById(userId)
                    .populate({
                        path: option,
                        match: { visible: 'Public' }
                    })
            }
        }

        return filteredItems?.[option]
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

const removeSavedIdsAfterDeletingTrainingProgram = async (ids, trainingId) => {
    try {
        let allUsers = await User.find({ _id: [...ids] })

        allUsers.forEach(async (x) => {
            await x.update({ $pull: { savedTrainings: { $in: [...trainingId] } } });
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
        let { email, password, verificationId } = data

        let user = await User.findOne({ email })

        if (!user) {
            return { message: "Email or password don't match!" }
        }

        let isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return { message: "Email or password don't match!" }
        }

        if (verificationId != '') {
            if (user.verification != verificationId) {
                return { message: "Wrong verification code!" }
            }

            await sendEmail('Verification complete!', user.email, verificationId)

            user.verification = 'True'

            user.save()
        }

        if (user.verification != 'True') {
            return { message: "Email is not verified!" }
        }

        let result = await new Promise((resolve, reject) => {
            jwt.sign({ _id: user._id, username: user.username, email: user.email }, secret, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return reject(err)
                }

                resolve(token)
            })
        })

        return { message: 'yes', token: result, _id: user?._id, email: user?.email }
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

        let isExist = await User.findOne({ email: user.email })

        if (isExist) {
            return { message: "Email already exist!" }
        }

        if (user.image != '') {
            const buffer = Buffer.from(user?.image.split(";base64,").pop(), "base64");

            user.image = await sharp(buffer)
                .resize(150, 150, { fit: "inside" })
                .toBuffer()
                .then(async (thumbnail) => {
                    return `data:image/jpeg;base64,${thumbnail.toString("base64")}`
                });
        }

        let hashedPassword = await bcrypt.hash(user.password, 10)

        let newDate = new Date()
        let date = newDate.toLocaleString()

        let verificationId = shortid.generate()

        let isReadyEmail = await sendEmail('sendCode', user.email, verificationId)

        if (isReadyEmail.message == 'An error has occured!') {
            return { message: 'Email is not valid!' }
        }

        let createdUser = {
            email: user.email,
            username: user.username,
            password: hashedPassword,
            verification: verificationId,
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

        if (!targetUser.email || !myUser.email) {
            return { message: "User doesn't exist!" }
        }

        if (targetUser.followers.includes(ownId)) {
            targetUser.followers = targetUser.followers.filter(x => x != ownId)
            myUser.following = myUser.following.filter(x => x != userId)
        } else {
            targetUser.followers.push(ownId)
            myUser.following.push(userId)

            let newNotificationId = await addNotification(targetUser._id, myUser._id, 'follow')

            targetUser.notifications.push(newNotificationId)
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

        let oldPass = await bcrypt.compare(values.password, user?.password)

        if (!oldPass) {
            return { message: "Wrong password!" }
        }

        let userIsValid = editUserValidator(values)

        if (userIsValid.message) {
            return userIsValid
        }

        let hashedPassword = await bcrypt.hash(userIsValid.password, 10)

        if (values.image != '') {
            const buffer = Buffer.from(values?.image.split(";base64,").pop(), "base64");

            values.image = await sharp(buffer)
                .resize(150, 150, { fit: "inside" })
                .toBuffer()
                .then(async (thumbnail) => {
                    return `data:image/jpeg;base64,${thumbnail.toString("base64")}`
                });
        }

        if (values.newPassword != '') {
            await sendEmail('Change password!', user.email, '')
        } else {
            await sendEmail('Profile edit!', user.email, '')
        }

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

const addNewTrainingProgramToUser = async (user, trainingId) => {
    try {
        let userInfo = await User.findById(user._id)

        if (!userInfo) {
            return { message: "User not found!" }
        }

        userInfo.trainings.push(trainingId)
        userInfo.save()

        return userInfo
    } catch (error) {
        return error
    }
}

const deleteAcc = async (password, userId) => {
    try {
        console.log('========= STARTING ==========');

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

        console.log(user);

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
    editProfile,
    addNewPostToUser,
    getByOption,
    toggleFollowPerson,
    removeSavedIdsAfterDeletingPost,
    removePostAfterDeletingPost,
    deleteAcc,
    addNewTrainingProgramToUser,
    getAllUsersByIds,
    removeSavedIdsAfterDeletingTrainingProgram,
    getUserByIdInitCalendar,
    addNewCalendarYearToUser,
    getUserByIdCalendarCurrDay,
    getUserByUsernames,
    getAllNotifications
}