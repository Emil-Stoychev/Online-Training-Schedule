
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/images'

export const getFullImage = (imageId, token) => {
    return fetch(`${URL}/${imageId}/${token}`)
        .then(res => res.json())
}