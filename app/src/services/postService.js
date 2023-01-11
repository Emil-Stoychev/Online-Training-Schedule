
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/posts'

export const getAllPosts = (pageNum) => {
    return fetch(`${URL}/${pageNum}`)
        .then(res => res.json())
}

export const getPostById = (id, token) => {
    return fetch(`${URL}/details/${id}/${token}`)
        .then(res => res.json())
}

export const createPost = (data) => {
    return fetch(`${URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const toggleLikePost = (data) => {
    return fetch(`${URL}/toggleLikePost/${data.postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const toggleSavePost = (data) => {
    return fetch(`${URL}/toggleSavePost/${data.postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const addComment = (data) => {
    return fetch(`${URL}/addComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const addReplyComment = (data) => {
    return fetch(`${URL}/addReplyComment/${data.commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const likeComment = (data) => {
    return fetch(`${URL}/likeComment/${data.commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const editComment = (commentValue, commentId, token) => {
    let data = {
        commentValue,
        commentId,
        token
    }

    return fetch(`${URL}/editComment/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const getComments = (postId, token) => {
    return fetch(`${URL}/getComments/${postId}/${token}`)
        .then(res => res.json())
}

export const deleteComment = (commentId, token, parentId) => {
    let data = {
        commentId,
        token,
        parentId
    }

    return fetch(`${URL}/deleteComment/${commentId}/${parentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}