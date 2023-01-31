const { TrainingCategory } = require('../Models/TrainingCategory')
const { TrainingImage } = require('../Models/TrainingImage')
const { TrainingCnt } = require('../Models/TrainingCnt')
const sharp = require("sharp");

const trainingProgramValidator = async (container, categoryId, userId, mainTitle) => {

    container = await Promise.all(container.map(async (x) => {
        let curr = Object.values(x)[0]

        
        if (curr?.option == 'image') {
            return await createImages(curr, userId, undefined)
        }
        return await TrainingCnt.create({
            author: userId,
            ...Object.values(x)[0]
        })
            .then(res => {
                return res?._id
            })
    }))

    let data = {
        container: [...container],
        category: categoryId,
        author: userId,
        mainTitle
    }

    return data
}

async function createImages(curr, userId, cntId, idsForDeleting) {
    let ids = []

    await Promise.all(curr?.image.map(async (y) => {
        let opt = y?.data ? y?.data.split(";base64,").pop() : y?.thumbnail.split(";base64,").pop()

        const buffer = Buffer.from(opt, "base64")

        let id = await sharp(buffer)
            .resize(120, 120, { fit: "inside" })
            .toBuffer()
            .then(async (thumbnail) => {
                return TrainingImage.create({
                    image: y?.data || y?.thumbnail,
                    thumbnail: `data:image/jpeg;base64,${thumbnail.toString("base64")}`,
                    author: userId,
                })
                    .then(res => {
                        return res?._id
                    })
            });

        ids.push(id)
    }))

    if (cntId == undefined) {
        return await TrainingCnt.create({
            author: userId,
            image: [...ids],
            option: 'image',
        })
            .then(res => {
                return res?._id
            })
    } else {
        let currCnt = await TrainingCnt.findById(cntId)

        currCnt.image = idsForDeleting.map(x => {
            if (!currCnt.image.includes(x)) {
                return x
            }
        })

        currCnt.image = [...currCnt.image, ids]

        currCnt.save()

        return currCnt
    }
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
    checkAndMakeCategory,
    createImages
}