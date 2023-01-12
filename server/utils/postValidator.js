const imageAddressPattern = '^(?:http\\:\\/\\/|https\\:\\/\\/).+$'

const imageRegex = new RegExp(imageAddressPattern)

const postValidator = (data, user) => {
    let { description, images, select } = data

    if (!description || description.length < 3 || description.trim() === '') {
        return { message: 'Description must be at least 3 characters!' }
    }

    let post = {
        description,
        images,
        visible: select,
    }

    if (user) {
        post.author = user._id
        post.username = user.username
        post.profileImage = user._id
        post.createdOn = new Date()
    }

    return post
}

module.exports = {
    postValidator
}