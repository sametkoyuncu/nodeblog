const express = require('express')
const router = express.Router()
const path = require('path')
const User = require('../models/User')

router.get('/login', function (req, res) {
    res.render('dashboard/login', { layout: false, title: 'Giriş Yap' })
})

router.post('/login', async function (req, res) {
	const { email, password } = req.body
	try {
		const user = await User.login(email, password)
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
	res.redirect('/account/login')
})

module.exports = router