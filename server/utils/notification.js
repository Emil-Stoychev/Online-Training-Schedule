const { Notification } = require('../Models/Notifications')

const addNotification = async (author, from, option, postId, trainingId) => {

    let title

    if (option == 'follow') {
        title = 'started following you.'
    } else if (option == 'comment') {
        title = 'comment your post.'
    } else if (option == 'like post') {
        title = 'like your post.'
    } else if (option == 'reply comment on your post!') {
        title = 'reply comment on your post.'
    } else if (option == 'like comment on your post!') {
        title = 'like comment on your post.'
    } else if (option == 'like training program') {
        title = 'like your training program.'
    } else if (option == 'like your comment on this post!') {
        title = 'like your comment on this post.'
    } else if (option == 'reply on your comment on this post!') {
        title = 'reply on your comment on this post.'
    } else if (option == 'reply on your comment on your post!') {
        title = 'reply on your comment on your post.'
    } else if (option == 'save post') {
        title = 'save your post.'
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