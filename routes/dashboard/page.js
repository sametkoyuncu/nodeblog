const express = require('express')
const router = express.Router()
const About = require('../../models/About')
const Contact = require('../../models/Contact')

router.get('/about', function (req, res) {
  About.find({})
    .limit(1)
    .then((about) => {
      res.render('dashboard/about', {
        layout: 'dashboard',
        title: 'Hakkımızda',
        about: about[0],
        active: { page: true, pageAbout: true },
      })
    })
})

router.put('/about/:id', function (req, res) {
  About.findOne({ _id: req.params.id }).then((about) => {
    about.content = req.body.content
    about.save()
    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Değişiklikler başarıyla kaydedildi.',
    }

    res.redirect('/dashboard/pages/about')
  })
})

router.get('/contact', function (req, res) {
  Contact.find({})
    .limit(1)
    .then((contact) => {
      res.render('dashboard/contact', {
        layout: 'dashboard',
        title: 'İletişim',
        contact: contact[0],
        active: { page: true, pageContact: true },
      })
    })
})

router.put('/contact/:id', function (req, res) {
  Contact.findOne({ _id: req.params.id }).then((contact) => {
    contact.content = req.body.content
    contact.email = req.body.email
    contact.phone = req.body.phone
    contact.address = req.body.address
    contact.save()
    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Değişiklikler başarıyla kaydedildi.',
    }

    res.redirect('/dashboard/pages/contact')
  })
})

module.exports = router
