const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const About = require('../models/About')

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
  Post.find()
    .limit(3)
    .populate({ path: 'category', model: Category })
    .then((posts) => {
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
        About.find({})
          .limit(1)
          .then((about) => {
            res.render('about', {
              posts: posts,
              title: 'Hakkımızda',
              categories: categories,
              about: about[0],
            })
          })
      })
    })
})

module.exports = router
