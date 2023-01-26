const { TrainingPrograms } = require('../Models/Training.js')
const { trainingProgramValidator } = require('../utils/trainingProgramValidator')
const { getUserById, addNewPostToUser, removeSavedIdsAfterDeletingPost, removePostAfterDeletingPost } = require('./authService')

const getAll = async (pageNum) => {
    try {
        return await TrainingPrograms.find({ visible: 'Public' })
            .sort('-createdOn')
            .limit(10)
            .skip(pageNum)
            .populate('profileImage', ['image', 'username', 'location'])

    } catch (error) {
        console.error(error)
        return error
    }
}

const create = async (container, category, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user) {
            return { message: "This user doesn't exist" }
        }

        let data = trainingProgramValidator(container, category, user?._id)

        return await TrainingPrograms.create(data)
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = {
    getAll,
    create
}