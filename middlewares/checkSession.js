const User = require('../models/User')
const checkSession = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/account/login')
    }
    next()
}

module.exports = {
    checkSession
}