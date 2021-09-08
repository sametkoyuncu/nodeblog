const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', function (req, res) {
    res.render('dashboard/home', { layout: 'dashboard' })
})

//POST ROUTES

router.get('/posts/new', function (req, res) {
    res.render('dashboard/post-create', { layout: 'dashboard' })
})

router.post('/posts/new', function (req, res) {
    Post.create(req.body)
    res.send('Ok')
})

//ACCOUNT ROUTES

router.get('/login', function (req, res) {
    res.render('dashboard/login', { layout: false })
})

router.get('/register', function (req, res) {
    res.render('dashboard/register', { layout: false })
})

module.exports = router