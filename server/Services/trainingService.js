const { TrainingPrograms } = require('../Models/Training.js')
const { TrainingImage } = require('../Models/TrainingImage.js')
const { TrainingCategory } = require('../Models/TrainingCategory')

const { trainingProgramValidator, checkAndMakeCategory } = require('../utils/trainingProgramValidator')
const { getUserById, removeSavedIdsAfterDeletingTrainingProgram, addNewTrainingProgramToUser, removeSavedIdsAfterDeletingPost, removePostAfterDeletingPost } = require('./authService')
const { TrainingCnt } = require('../Models/TrainingCnt.js')

const getById = async (trainingId) => {
    try {
        return await TrainingPrograms.findById(trainingId)
            .populate('author', ['image', 'username', 'location'])
            .populate('category', ['category'])
            .populate({
                path: 'container',
                populate: {
                    path: 'image',
                    select: ['thumbnail']
                }
            })
    } catch (error) {
        console.error(error)
        return error
    }
}

const getFastInfoAboutProgram = async (trainingId) => {
    try {
        return await TrainingPrograms.findById(trainingId)
            .populate('category', ['category'])
            .populate('container')
    } catch (error) {
        console.error(error)
        return error
    }
}

const getFullImage = async (imageId) => {
    try {
        return await TrainingImage.findById(imageId).select('image')
    } catch (error) {
        console.error(error)
        return error
    }
}

const create = async (mainTitle, container, category, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user) {
            return { message: "This user doesn't exist!" }
        }

        let option = false

        if (mainTitle == null && container.length == 0) {
            option = true
        } else if (mainTitle != null && mainTitle?.trim() == '') {
            option = true
        }

        let categ = await checkAndMakeCategory(category, user?._id, option)

        if (categ?.message) {
            return categ
        } else if (option) {
            return categ
        }

        let data = await trainingProgramValidator(container, categ?._id, user?._id, mainTitle)

        let newCreatedTrainingProgram = await TrainingPrograms.create(data)

        await addNewTrainingProgramToUser(user, newCreatedTrainingProgram?._id)

        return await TrainingPrograms.findById(newCreatedTrainingProgram._id).populate('category')
    } catch (error) {
        console.error(error)
        return error
    }
}

const toggleLike = async (trainingId, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user) {
            return { message: "This user doesn't exist!" }
        }

        let program = await TrainingPrograms.findById(trainingId)

        if (!program) {
            return { message: "This program doesn't exist!" }
        }

        if (program?.author == userId) {
            return { message: 'You cannot like/unlike this program!' }
        }

        if (program?.likes?.includes(user._id)) {
            await program.update({ $pull: { likes: user._id } });
            await user.update({ $pull: { savedTrainings: program._id } });
        } else {
            await program.update({ $push: { likes: user._id } });
            await user.update({ $push: { savedTrainings: program._id } });
        }

        return { trainingId, userId }
    } catch (error) {
        console.error(error)
        return error
    }
}

const getAllCategories = async (author) => {
    try {
        return await TrainingCategory.find({ author })
    } catch (error) {
        console.error(error)
        return error
    }
}

const getTrainingsByCategory = async (category) => {
    try {
        return await TrainingPrograms.find({ category })
    } catch (error) {
        console.error(error)
        return error
    }
}

const deleteProgram = async (trainingId, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user) {
            return { message: "This user doesn't exist!" }
        }

        let program = await TrainingPrograms.findById(trainingId)

        if (!program) {
            return { message: "This program doesn't exist!" }
        }

        if (program?.author != userId) {
            return { message: 'You cannot delete this program!' }
        }

        await removeSavedIdsAfterDeletingTrainingProgram(program.likes, [program._id])

        let imagesIds = []

        let allCnts = await TrainingCnt.find({ _id: [...program.container] })

        allCnts.forEach(x => {
            imagesIds.push(...x.image)
        })

        await TrainingCnt.deleteMany({ _id: [...program.container] })

        await TrainingImage.deleteMany({ _id: [...imagesIds] })

        await user.update({ $pull: { trainings: program._id } });

        await TrainingPrograms.findByIdAndDelete(program._id)

        return {}
    } catch (error) {
        console.error(error)
        return error
    }
}

const deleteCategory = async (categoryId, userId) => {
    try {
        let user = await getUserById(userId)

        if (!user) {
            return { message: "This user doesn't exist!" }
        }

        let category = await TrainingCategory.findById(categoryId)

        if (!category) {
            return { message: "This category doesn't exist!" }
        }

        if (category?.author != userId) {
            return { message: 'You cannot delete this category!' }
        }

        let allTrainingsByCategory = await TrainingPrograms.find({ category: categoryId })

        if (allTrainingsByCategory.length > 0) {

            let programsIds = []
            let programsIdsLikes = []
            let allCntsIds = []
            let imagesIds = []


            allTrainingsByCategory.forEach(x => {
                programsIds.push(x._id)
                programsIdsLikes.push(...x?.likes)
                allCntsIds.push(...x?.container)
            })

            let allCnts = await TrainingCnt.find({ _id: [...allCntsIds] })

            allCnts.forEach(x => {
                imagesIds.push(...x.image)
            })

            await removeSavedIdsAfterDeletingTrainingProgram(programsIdsLikes, programsIds)

            await TrainingCnt.deleteMany({ _id: [...allCntsIds] })

            await TrainingImage.deleteMany({ _id: [...imagesIds] })

            await TrainingPrograms.deleteMany({ _id: [...programsIds] })

            await user.update({ $pullAll: { trainings: [...programsIds] } })
        }

        return await TrainingCategory.findByIdAndDelete(categoryId)
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = {
    getById,
    create,
    getFullImage,
    getAllCategories,
    getTrainingsByCategory,
    getFastInfoAboutProgram,
    toggleLike,
    deleteProgram,
    deleteCategory
}