const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('contact', { title: 'İletişim' })
})

router.post('/email', function (req, res) {
  const outputHTML = `
    <h2>Nodeblog Sitesinden Gelen Eposta Detayları</h2>
    <ul>
      <li>Ad Soyad: ${req.body.fullName}</li>
      <li>Eposta: ${req.body.email}</li>
    </ul>
    <h3>Mesaj</h3>
    <p>
      ${req.body.message}
    </p>
  `
  ;('use strict')
  const nodemailer = require('nodemailer')

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nodeblog İletişim Sayfası 👻" <sametkoyunncu@gmail.com>', // sender address
      to: 'sametkoyuncu@live.com, ziplayanpenguen@gmail.com', // list of receivers
      subject: 'Nodeblog İletişim', // Subject line
      text: 'Hello world?', // plain text body
      html: outputHTML, // html body
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: `Mesajının aldık. 💌 En kısa sürede dönüş yapacağız.. `,
    }
    res.redirect('/contact')
  }

  main().catch(console.error)
  req.session.sessionFlash = {
    type: 'alert alert-danger',
    message: `Bir hata oluştu.`,
  }
  res.redirect('/contact')
})

module.exports = router
