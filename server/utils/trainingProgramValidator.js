const { TrainingCategory } = require('../Models/TrainingCategory')
const { TrainingImage } = require('../Models/TrainingImage')
const sharp = require("sharp");

const trainingProgramValidator = async (container, categ, userId) => {
    console.log('Start validator....=====================================================');

    container = await Promise.all(container.map(async (x) => {
        let curr = Object.values(x)[0]
        let parentId = Object.values(x)[0]?.id

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

            return {
                [parentId]: {
                    image: [...ids],
                    id: curr?.id,
                    option: 'image'
                }
            }
        }

        return x
    }))

    // if (!curr?.value || curr?.value.length < 3 || curr?.value.trim() === '') {
    //     return { message: `${curr?.option} must be at least 3 characters!` }
    // }

    if (categ.value == '' || categ.value.trim() == '') {
        return { message: 'Category is not valid!' }
    }

    let foundCategory = await TrainingCategory.find({ category: categ.value, author: userId })

    if (foundCategory?.length == 0) {
        let categoryData = {
            author: userId,
            category: categ.value
        }

        await TrainingCategory.create(categoryData)
            .then(res => {
                return foundCategory.push(res)
            })
    }

    let data = {
        container: [...container],
        category: foundCategory[0]?._id,
        author: userId
    }

    console.log('FINAL ====================!=================');
    return data
}

// container: { type: Array },

module.exports = {
    trainingProgramValidator
}