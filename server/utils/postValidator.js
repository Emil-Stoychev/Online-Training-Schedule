const imageAddressPattern = '^(?:http\\:\\/\\/|https\\:\\/\\/).+$'

const imageRegex = new RegExp(imageAddressPattern)

const productValidator = (data, user) => {
    let { description, images, select } = data

    if (!description || description.length < 3 || description.trim() === '') {
        return { message: 'Description must be at least 3 characters!' }
    }

    let product = {
        description,
        images,
        visible: select,
        createdOn: new Date()
    }

    if (user) {
        product.author = user._id
        product.username = user.username
        product.profileImage = user._id
    }

    return product
}

module.exports = {
    productValidator
}