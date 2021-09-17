const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

require('./mongo-connection')
// require('./express-session')

const app = express()
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const mainRouter = require('./routes/main')
const dashboardRouter = require('./routes/dashboard/index')
const accountRouter = require('./routes/account')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate

const port = 3000

// session start
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
//for delete method
app.use(methodOverride('_method'))
//session
app.use(expressSession({
    secret: 'pars barut cesur duman',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/nodeblog'
    })
}))

// flash - message middleware
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
}) 

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

// for session use in handlebars
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/', mainRouter)
app.use('/dashboard', dashboardRouter)
app.use('/account', accountRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use((req, res) => {
    res.status(404).render('404', { layout: false, title: 'Sayfa Bulunamadı' })
})