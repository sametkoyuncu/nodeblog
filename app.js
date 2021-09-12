const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')

require('./mongo-connection')
const app = express()
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const mainRouter = require('./routes/main')
const dashboardRouter = require('./routes/dashboard')
const accountRouter = require('./routes/account')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate

const port = 3000

app.use(fileUpload())

app.use(express.static('public'))

app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { generateDate }
}))

app.set('view engine', 'handlebars')
// body parser yerine geçiyor gibi
// app.use(express.urlencoded({ extended: true }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', mainRouter)
app.use('/dashboard', dashboardRouter)
app.use('/account', accountRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use((req, res) => {
    res.status(404).render('404', { layout: false, title: 'Sayfa Bulunamadı' })
})