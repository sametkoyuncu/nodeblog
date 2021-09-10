const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', function (req, res) {
    res.render('home')
})

router.get('/blog', function (req, res) {
    Post.find({}).then(posts => {
        res.render('blog', { posts:posts })
    })
})

router.get('/blog/:id', function (req, res) {
    const postId = req.params.id
    Post.findById({ _id: postId }).then(post => {
        res.render('blog-single', { post: post })
    })
})

router.get('/about', function (req, res) {
    res.render('about')
})

router.get('/contact', function (req, res) {
    res.render('contact')
})

router.get('/login', function (req, res) {
    res.render('dashboard/login', { layout: false })
})

router.get('/register', function (req, res) {
    res.render('dashboard/register', { layout: false })
})

module.exports = router