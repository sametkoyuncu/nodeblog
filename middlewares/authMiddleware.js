const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req.cookies.nodeblogCookie

  if (!token) {
    res.redirect('/account/login')
  }

  jwt.verify(token, 'parsbarut', (err, decodedToken) => {
    if (err) {
      console.log(err)
      res.redirect('/account/login')
    }
    //codes, if u want
    next()
  })
}

const checkUser = (req, res, next) => {
  const token = req.cookies.nodeblogCookie

  if (token) {
    jwt.verify(token, 'parsbarut', async (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.locals.loggedUser = null
        next()
      } else {
        console.log(decodedToken)
        let user = await User.findById(decodedToken.id)
        res.locals.loggedUser = user
        next()
      }
    })
  } else {
    res.locals.loggedUser = null
    next()
  }
}

module.exports = {
  requireAuth,
  checkUser
}