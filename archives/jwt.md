# install
> npm i jsonwebtoken
> npm i cookie-parser
# /middlewares/authMiddleware.js

> const jwt = require('jsonwebtoken')
> const User = require('../models/User')
> 
> const requireAuth = (req, res, next) => {
>   const token = req.cookies.nodeblogCookie
> 
>   if (!token) {
>     res.redirect('/account/login')
>   }
> 
>   jwt.verify(token, 'parsbarut', (err, decodedToken) => {
>     if (err) {
>       console.log(err)
>       res.redirect('/account/login')
>     }
>     //codes, if u want
>     next()
>   })
> }
> 
> const checkUser = (req, res, next) => {
>   const token = req.cookies.nodeblogCookie
> 
>   if (token) {
>     jwt.verify(token, 'parsbarut', async (err, decodedToken) => {
>       if (err) {
>         console.log(err)
>         res.locals.loggedUser = null
>         next()
>      } else {
>        let user = await User.findById(decodedToken.id)
>         res.locals.loggedUser = user
>         next()
>       }
>     })
>   } else {
>     res.locals.loggedUser = null
>     next()
>   }
> }
> 
> module.exports = {
>   requireAuth,
>   checkUser
> }

# /routes/account.js

> const express = require('express')
> const router = express.Router()
> const path = require('path')
> const User = require('../models/User')
> const jwt = require('jsonwebtoken')
> 
> const maxAge = 60*60*24
> 
> const createToken = (id) => {
> 	return jwt.sign({id}, 'parsbarut', { expiresIn: maxAge })
> }
> 
> router.get('/login', function (req, res) {
>     res.render('dashboard/login', { layout: false, title: 'Giriş Yap' })
> })
> 
> router.post('/login', async function (req, res) {
> 	const { email, password } = req.body
> 	try {
> 		const user = await User.login(email, password)
> 		const token = createToken(user._id)
> 		res.cookie('nodeblogCookie', token, { httpOnly: true, maxAge: maxAge * 1000 })
> 		res.redirect('/dashboard')
> 	} catch(e) {
> 		console.log(e)
> 	}
> })
> 
> router.get('/register', function (req, res) {
>     res.render('dashboard/register', { layout: false, title: 'Hesap Oluştur' })
> })
> 
> router.post('/register', function (req, res) {
>     User.create(req.body)
> 			.then((result) => {
> 				res.redirect('/account/login')
> 			})
> 			.catch((err) => {
> 				console.log(err)
> 			})
> })
> 
> router.get('/logout', function (req, res) {
> 	res.cookie('nodeblogCookie', '', { maxAge: 1 })
> 	res.redirect('/account/login')
> })
> 
> module.exports = router



# /views/partials/dashNavbar.handlebars
> {{ loggedUser.firstName }} {{ loggedUser.lastName }} {{ loggedUser.image }}`

# /app.js

> const cookieParser = require('cookie-parser')
> const { requireAuth, checkUser } = require('./middlewares/authMiddleware')
> app.use(cookieParser())
> app.get('*', checkUser)
> app.use('/dashboard', requireAuth, dashboardRouter)
