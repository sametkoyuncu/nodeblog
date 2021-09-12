const express = require('express')
const router = express.Router()
const path = require('path')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24

const createToken = (id) => {
	return jwt.sign({id}, 'parsbarut', { expiresIn: maxAge })
}

router.get('/login', function (req, res) {
    res.render('dashboard/login', { layout: false, title: 'Giriş Yap' })
})

router.post('/login', async function (req, res) {
	const { email, password } = req.body
	try {
		const user = await User.login(email, password)
		const token = createToken(user._id)
		res.cookie('nodeblogCookie', token, { httpOnly: true, maxAge: maxAge * 1000 })
		res.redirect('/dashboard')
	} catch(e) {
		console.log(e)
	}
})

router.get('/register', function (req, res) {
    res.render('dashboard/register', { layout: false, title: 'Hesap Oluştur' })
})

router.post('/register', function (req, res) {
    User.create(req.body)
			.then((result) => {
				res.redirect('/account/login')
			})
			.catch((err) => {
				console.log(err)
			})
})

router.get('/logout', function (req, res) {
	res.cookie('nodeblogCookie', '', { maxAge: 1 })
	res.redirect('/account/login')
})

module.exports = router