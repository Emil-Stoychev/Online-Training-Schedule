const { Notification } = require('../Models/Notifications')

const addNotification = async (author, from, option, postId, trainingId) => {

    let title

    if (option == 'follow') {
        title = 'started following you.'
    } else if (option == 'comment') {
        title = 'comment your post.'
    }

    let obj = {
        author,
        title,
        from,
        postId,
        trainingId,
    }

    let newNotification = await Notification.create(obj)

    return newNotification._id
}

module.exports = {
    addNotification,
}