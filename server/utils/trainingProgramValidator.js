const { TrainingCategory } = require('../Models/TrainingCategory')
const { TrainingImage } = require('../Models/TrainingImage')
const { TrainingCnt } = require('../Models/TrainingCnt')
const sharp = require("sharp");

const trainingProgramValidator = async (container, categoryId, userId, mainTitle, visible) => {

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
        mainTitle,
        'visible': visible
    }

    return data
}

const trainingEditProgramValidator = async (container, categoryId, userId, mainTitle, visible) => {

    container = await Promise.all(container.map(async (x) => {

        let findCnt

        if (!x.new) {
            findCnt = await TrainingCnt.findById(x._id)
        }

        if (findCnt?._id) {
            if (x?.option == 'image') {
                return await createImages(x, userId, findCnt?._id)
            } else {
                await findCnt.update({ value: x.value })
            }

            return findCnt._id
        } else {
            if (x?.option == 'image') {
                return await createImages(x, userId, undefined)
            }

            return await TrainingCnt.create({
                author: userId,
                value: x.value,
                option: x.option
            })
                .then(res => {
                    return res?._id
                })
        }
    }))

    let data = {
        container: [...container],
        category: categoryId,
        author: userId,
        mainTitle,
        'visible': visible
    }

    return data
}

async function deleteImagesByCntIds(cntForDeleting) {
    cntForDeleting.forEach(async (x) => {
        let currCnt = await TrainingCnt.findById(x)

        if (currCnt.image.length > 0) {
            await TrainingImage.deleteMany({ _id: [...currCnt.image] })
        }

        await TrainingCnt.findByIdAndDelete(x)
    })
}

async function createImages(curr, userId, cntId) {
    let ids = []

    await Promise.all(curr?.image.map(async (y) => {

        let findImage

        if (!y.new) {
            findImage = await TrainingImage.findById(y._id)
        }

        if (findImage?._id) {
            return ids.push(findImage._id)
        }

        let opt = y?.data ? y?.data.split(";base64,").pop() : y?.thumbnail.split(";base64,").pop()

        const buffer = Buffer.from(opt, "base64")

        let id = await sharp(buffer)
            .resize(120, 120, { fit: "inside" })
            .toBuffer()
            .then(async (thumbnail) => {
                return await TrainingImage.create({
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

        currCnt.image = [...ids]

        currCnt.save()

        return currCnt._id
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
    createImages,
    trainingEditProgramValidator,
    deleteImagesByCntIds
}