const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Category = require('../models/Category')

router.get('/', function (req, res) {
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
                            num_of_posts: { $size: '$posts' }
                        }
                    }
                ])
                .then(categories => {
                    res.render('blog', { posts: posts, title: 'Blog', categories: categories })
                })
        })
})

router.get('/:id', function (req, res) {
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


router.get('/categories/:id', function (req, res) {
    const categoryId = req.params.id
    Post.find({ category: categoryId })
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
                            num_of_posts: { $size: '$posts' }
                        }
                    }
                ])
                .then(categories => {
                    Category.find({ _id: categoryId })
                        .then(category => {
                            res.render('blog-category', {
                                posts: posts,
                                title: `${category[0].name} Kategorisine Ait Bloglar`,
                                categories: categories,
                                pageHeader: category[0].name.toUpperCase()
                            })

                        })
                })
        })
})

module.exports = router