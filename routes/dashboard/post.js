const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')
const Category = require('../../models/Category')
const User = require('../../models/User')
const path = require('path')

router.get('/', function (req, res) {
    Post.find({})
        .populate({ path: 'category', model: Category })
        .sort({ $natural: -1 })
        .then(posts => {
            console.log(posts)
            res.render('dashboard/posts', { layout: 'dashboard', posts: posts, title: 'Blog Listesi' })
    })
})

router.get('/new', function (req, res) {
    Category.find({})
        .then(categories => {
        res.render('dashboard/post-create', { layout: 'dashboard', title: 'Yeni Blog Ekle', categories: categories })
    })
})

router.post('/new', function (req, res) {
    let postImage = req.files.image
    let postImageName = Date.now() + postImage.name
    postImage.mv(path.resolve(__dirname, '../../public/img/uploaded/posts', postImageName))

    Post.create({
        ...req.body,
        image: `/img/uploaded/posts/${postImageName}`,
        author: req.session.userId
    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: `'${req.body.title}' isimli blog başarılı bir şekilde paylaşıldı.`
    }

    res.redirect('/dashboard/posts')
    // res.status(201).render('dashboard/posts', { layout: 'dashboard' })
})

module.exports = router