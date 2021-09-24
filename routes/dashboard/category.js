const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

router.get('/', function (req, res) {
  Category.find({})
    .sort({ $natural: -1 })
    .then((categories) => {
      res.render('dashboard/categories', {
        layout: 'dashboard',
        categories: categories,
        title: 'Kategoriler',
        active: { category: true },
      })
    })
})

router.post('/', function (req, res) {
  Category.create(req.body, (error, category) => {
    if (error) {
      console.log(error)
      req.session.sessionFlash = {
        type: 'alert alert-danger',
        message: `'${req.body.name}' isimli kategori eklenirken bir hata oluştu.`,
      }
    }

    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: `'${req.body.name}' isimli kategori başarılı bir şekilde paylaşıldı.`,
    }

    res.redirect('/dashboard/categories')
  })
})

router.get('/edit/:id', function (req, res) {
  Category.findOne({ _id: req.params.id }).then((category) => {
    res.render('dashboard/category-edit', {
      layout: 'dashboard',
      category: category,
      title: 'Kategori Düzenle',
      active: { category: true },
    })
  })
})

router.put('/edit/:id', function (req, res) {
  Category.findOne({ _id: req.params.id }).then((category) => {
    category.name = req.body.name

    category.save().then((category) => {
      req.session.sessionFlash = {
        type: 'alert alert-success',
        message: `'${category.name}' isimli kategori başarılı bir şekilde güncellendi.`,
      }

      res.redirect('/dashboard/categories')
    })
  })
})

router.delete('/:id', function (req, res) {
  Category.deleteOne({ _id: req.params.id }).then(() => {
    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Kategori başarılı bir şekilde silindi.',
    }

    res.redirect('/dashboard/categories')
  })
})

module.exports = router
