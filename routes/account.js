const express = require('express')
const router = express.Router()
const path = require('path')
const User = require('../models/User')

router.get('/login', function (req, res) {
    res.render('dashboard/login', { layout: false, title: 'Giriş Yap' })
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

module.exports = router