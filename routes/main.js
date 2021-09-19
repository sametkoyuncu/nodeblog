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
            Category
                .aggregate([
                    {
                        $lookup: {
                            from: 'posts',
                            localField: '_id',
                            foreignField: 'category',
                            as: 'posts'
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            num_of_posts: {$size: '$posts'}
                        }
                    }
                ])
                .then(categories => {
                    res.render('blog', { posts: posts, title: 'Blog', categories: categories })
                })
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
                .populate({ path: 'category', model: Category })
                .then(posts => {
                    Category.find({}).then(categories => {
                        res.render('blog-single', {
                            post: post,
                            title: post.title,
                            posts: posts,
                            categories: categories
                        })
                    })
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