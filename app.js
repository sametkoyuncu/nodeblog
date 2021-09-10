const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')

require('./mongo-connection')
const app = express();
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const mainRouter = require('./routes/main')
const dashboardRouter = require('./routes/dashboard')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
// const moment = require('moment');

const port = 3000

app.use(fileUpload())

app.use(express.static('public'))

// prototpeaccess sorunu yaşadığım için hem sorunun çözen kodu
// hem de date formatlayan kodu nasıl birlikte kullanacağımı bilmiyorum 
// çözünce tekrar düzenlenecek.. (moment.js)
// const hbs = exphbs.create({
//     helpers: {
//         generateDate: (date, format) => {
//             return moment(date).format(format)
//         }
//     }
// })
//
// app.engine('handlebars', hbs.engine)
// --gösterilecek yere ekle
// {{generateDate date 'MMM DD YYYY'}}
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', mainRouter)
app.use('/dashboard', dashboardRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use((req, res) => {
    res.render('404', { layout: false, title: 'Sayfa Bulunamadı' })
})