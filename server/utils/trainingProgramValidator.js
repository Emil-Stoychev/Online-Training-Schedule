const { TrainingCategory } = require('../Models/TrainingCategory')
const { TrainingImage } = require('../Models/TrainingImage')
const { TrainingCnt } = require('../Models/TrainingCnt')
const sharp = require("sharp");

const trainingProgramValidator = async (container, categoryId, userId, mainTitle) => {

    container = await Promise.all(container.map(async (x) => {
        let curr = Object.values(x)[0]

        if (curr?.option == 'image') {
            let ids = []

            await Promise.all(curr?.image.map(async (y) => {
                const buffer = Buffer.from(y?.data.split(";base64,").pop(), "base64");

                let id = await sharp(buffer)
                    .resize(120, 120, { fit: "inside" })
                    .toBuffer()
                    .then(async (thumbnail) => {
                        return TrainingImage.create({
                            image: y?.data,
                            thumbnail: `data:image/jpeg;base64,${thumbnail.toString("base64")}`,
                            author: userId,
                            parentId: curr?.id,
                        })
                            .then(res => {
                                return res?._id
                            })
                    });

                ids.push(id)
            }))

            return await TrainingCnt.create({
                author: userId,
                image: [...ids],
                option: 'image'
            })
                .then(res => {
                    return res?._id
                })
        }
        return await TrainingCnt.create({
            author: userId,
            ...Object.values(x)[0]
        })
            .then(res => {
                return res?._id
            })
    }))

    // if (!curr?.value || curr?.value.length < 3 || curr?.value.trim() === '') {
    //     return { message: `${curr?.option} must be at least 3 characters!` }
    // }

    let data = {
        container: [...container],
        category: categoryId,
        author: userId,
        mainTitle
    }

    return data
}

const checkAndMakeCategory = async (categ, userId, option) => {
    if (categ.value == '' || categ.value.trim() == '') {
        return { message: 'Category is not valid!' }
    }

    let foundCategory = await TrainingCategory.find({ category: categ.value, author: userId })

    if (foundCategory?.length == 0) {
        let categoryData = {
            author: userId,
            category: categ.value
        }

        return await TrainingCategory.create(categoryData)
    } else {
        if (option) {
            return { message: 'This category is already exist!' }
        } else {
            return foundCategory[0]
        }
    }
}

// container: { type: Array },

module.exports = {
    trainingProgramValidator,
    checkAndMakeCategory
}