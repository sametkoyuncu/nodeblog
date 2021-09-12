const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', function (req, res) {
    res.render('home', { title: 'Anasayfa' })
})

router.get('/blog', function (req, res) {
    Post.find({}).then(posts => {
        res.render('blog', { posts: posts, title: 'Blog' })
    })
})

router.get('/blog/:id', function (req, res) {
    const postId = req.params.id
    Post.findById({ _id: postId }).then(post => {
        res.render('blog-single', { post: post, title: post.title })
    })
})

router.get('/about', function (req, res) {
    res.render('about', { title: 'Hakkımızda' })
})

router.get('/contact', function (req, res) {
    res.render('contact', { title: 'İletişim' })
})

module.exports = router