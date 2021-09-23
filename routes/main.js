const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Category = require('../models/Category')

router.get('/', function (req, res) {
  res.render('home', { title: 'Anasayfa' })
})

router.get('/about', function (req, res) {
  res.render('about', { title: 'Hakkımızda' })
})

module.exports = router
