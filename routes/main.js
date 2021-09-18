const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Category = require('../models/Category')

router.get('/', function (req, res) {
    res.render('home', { title: 'Anasayfa' })
})

router.get('/blog', function (req, res) {
    Post.find({})
        .populate({ path: 'category', model: Category })
        .then(posts => {
            res.render('blog', { posts: posts, title: 'Blog' })
        })
})

router.get('/blog/:id', function (req, res) {
    const postId = req.params.id
    Post.findById({ _id: postId })
        .populate({ path: 'author', model: User })
        .populate({ path: 'category', model: Category })
        .then(post => {
            Post.find({})
                .sort({ $natural: -1 })
                .limit(3)
                .then(posts => {
                    res.render('blog-single', { post: post, title: post.title, posts: posts })
                })
        
    })
})

router.get('/about', function (req, res) {
    res.render('about', { title: 'Hakkımızda' })
})

router.get('/contact', function (req, res) {
    res.render('contact', { title: 'İletişim' })
})

module.exports = router