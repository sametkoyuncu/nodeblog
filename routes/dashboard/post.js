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

router.get('/edit/:id', function (req, res) {
    Post.findOne({ _id: req.params.id })
        .populate({ path: 'category', model: Category })
        .then(post => {
            Category.find({})
                .then(categories => {
                    res.render('dashboard/post-edit', {
                        layout: 'dashboard',
                        title: 'Blog Düzenle',
                        post: post,
                        categories: categories
                    })
                })
        })
})

router.put('/edit/:id', function (req, res) {
    if (req.body.image != null) {
        let postImage = req.files.image
        let postImageName = Date.now() + postImage.name
        postImage.mv(path.resolve(__dirname, '../../public/img/uploaded/posts', postImageName))

        Post.findOne({ _id: req.params.id }).then(post => {
            post.title = req.body.title
            post.content = req.body.content
            post.category = req.body.category
            post.date = req.body.date
            post.image = `/img/uploaded/posts/${postImageName}`
            post.author = req.session.userId

            post.save().then(post => {
                req.session.sessionFlash = {
                    type: 'alert alert-success',
                    message: `'${req.body.title}' isimli blog başarılı bir şekilde güncellendi.`
                }

                res.redirect('/dashboard/posts')
            })
        })
    }

    Post.findOne({ _id: req.params.id }).then(post => {
        post.title = req.body.title
        post.content = req.body.content
        post.category = req.body.category
        post.date = req.body.date
        post.author = req.session.userId

        post.save().then(post => {
            req.session.sessionFlash = {
                type: 'alert alert-success',
                message: `'${req.body.title}' isimli blog başarılı bir şekilde güncellendi.`
            }

            res.redirect('/dashboard/posts')
        })
    })

    
})

router.delete('/:id', function (req, res) {
    Post.deleteOne({ _id: req.params.id }).then(() => {
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Blog başarılı bir şekilde silindi.'
        }

        res.redirect('/dashboard/posts')
    })
})

module.exports = router