const jwt = require('jsonwebtoken')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

async function authMiddleware(req, res, next, token) {
    jwt.verify(req.params.token, secret)

    next()
}

module.exports = {
    authMiddleware
}