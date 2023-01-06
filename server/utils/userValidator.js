const emailPattern = '^(?:[A-Za-z]+[0-9]+|[A-Za-z]+|[0-9]+[A-Za-z]+)\\@[A-Za-z]+\\.[A-Za-z]+$'

const emailRegex = new RegExp(emailPattern)

const userValidator = (user) => {
    let { username, password, rePassword, location, image } = user

    if (username.length < 3 || username.trim() === '') {
        return { message: 'Username is not valid!' }
    }

    if (password != rePassword) {
        return { message: "Passwords don't match!" }
    }

    if (!password || password.length < 3 || password.trim() === '') {
        return { message: 'Password must be at least 3 characters!' }
    }

    if (image != '') {
        if (!image.startsWith('data:image')) {
            return { message: 'Profile picture should be valid!' }
        }
    }

    return { username, password, location, image }
}

module.exports = {
    userValidator
}