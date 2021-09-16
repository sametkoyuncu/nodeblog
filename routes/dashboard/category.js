const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

router.get('/', function (req, res) {
    Category.find({}).then(categories => {
        res.render('dashboard/categories', { layout: 'dashboard', categories: categories, title: 'Kategoriler' })
    })
})

// router.get('/new', function (req, res) {
//     res.render('dashboard/post-create', { layout: 'dashboard', title: 'Yeni Blog Ekle' })
// })

router.post('/', function (req, res) {
    Category.create({
        ...req.body
    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: `'${req.body.name}' isimli kategori başarılı bir şekilde paylaşıldı.`
    }

    res.redirect('/dashboard/categories')
    // res.status(201).render('dashboard/posts', { layout: 'dashboard' })
})

module.exports = router