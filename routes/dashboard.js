const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')

// check session
router.get('*', function (req, res, next) {
    if (req.session.userId === null || req.session.userId === undefined ) {
        res.redirect('/account/login')
    }
    next()
})

router.get('/', function (req, res) {
    res.render('dashboard/home', { layout: 'dashboard', title: 'Anasayfa' })
})

//POST ROUTES
router.get('/posts', function (req, res) {
    Post.find({}).then(posts => {
        res.render('dashboard/posts', { layout: 'dashboard', posts: posts, title: 'Blog Listesi' })
    })
})

router.get('/posts/new', function (req, res) {
    res.render('dashboard/post-create', { layout: 'dashboard', title: 'Yeni Blog Ekle' })
})

router.post('/posts/new', function (req, res) {
    let postImage = req.files.image
    let postImageName = Date.now() + postImage.name
    postImage.mv(path.resolve(__dirname, '../public/img/uploaded/posts', postImageName))
    
    Post.create({
        ...req.body,
        image: `/img/uploaded/posts/${postImageName}`
    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: `'${req.body.title}' isimli blog başarılı bir şekilde paylaşıldı.`
    }

    res.redirect('/dashboard/posts')
    // res.status(201).render('dashboard/posts', { layout: 'dashboard' })
})

module.exports = router