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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get('/search', function (req, res) {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Post.find({ "title": regex })
            .populate({ path: 'category', model: Category })
            .sort({ $natural: -1 })
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
                        res.render('blog-category', {
                            posts: posts,
                            title: 'Arama Sonuçları',
                            categories: categories,
                            pageHeader: `'${req.query.search}' için arama sonuçları: ${posts.length} eşleşme bulundu.`
                        })
                    })
            })
    }
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

module.exports = router