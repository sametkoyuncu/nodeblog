const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')

router.get('/', function (req, res) {
    res.render('dashboard/home', { layout: 'dashboard' })
})

//POST ROUTES

router.get('/posts/new', function (req, res) {
    res.render('dashboard/post-create', { layout: 'dashboard' })
})

router.post('/posts/new', function (req, res) {
    let postImage = req.files.image
    let postImageName = Date.now() + postImage.name
    postImage.mv(path.resolve(__dirname, '../public/img/uploaded/posts', postImageName))
    
    Post.create({
        ...req.body,
        image: `/img/uploaded/posts/${postImageName}`
    })
    res.render('dashboard/home', { layout: 'dashboard' })
})

//ACCOUNT ROUTES

router.get('/login', function (req, res) {
    res.render('dashboard/login', { layout: false })
})

router.get('/register', function (req, res) {
    res.render('dashboard/register', { layout: false })
})

module.exports = router