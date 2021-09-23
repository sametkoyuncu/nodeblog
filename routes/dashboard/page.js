const express = require('express')
const router = express.Router()
const About = require('../../models/About')

router.get('/about', function (req, res) {
  About.find({})
    .limit(1)
    .then((about) => {
      res.render('dashboard/about', {
        layout: 'dashboard',
        title: 'Hakkımızda',
        about: about[0],
      })
    })
})

router.put('/about/:id', function (req, res) {
  About.findOne({ _id: req.params.id }).then((about) => {
    about.content = req.body.content
    about.save()
    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: ` isimli kategori başarılı bir şekilde güncellendi.`,
    }

    res.redirect('/dashboard/pages/about')
  })
})

module.exports = router
