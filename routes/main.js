const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Category = require('../models/Category')

router.get('/', function (req, res) {
  Post.find({})
    .limit(2)
    .populate({ path: 'category', model: Category })
    .then((featuredPosts) => {
      Category.aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            num_of_posts: { $size: '$posts' },
          },
        },
      ]).then((categories) => {
        Post.find({})
          .skip(2)
          .populate({ path: 'category', model: Category })
          .then((posts) => {
            res.render('home', {
              featuredPosts: featuredPosts,
              posts: posts,
              title: 'Anasayfa',
              categories: categories,
            })
          })
      })
    })
})

router.get('/about', function (req, res) {
  res.render('about', { title: 'Hakkımızda' })
})

module.exports = router
