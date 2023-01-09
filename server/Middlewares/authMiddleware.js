const jwt = require('jsonwebtoken')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

async function authMiddleware(req, res, next) {
    let info = jwt.verify(req.params.token || req.body.token, secret)

    req.params.user = info

    next()
}

module.exports = {
    authMiddleware
}