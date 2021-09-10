const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
require('./mongo-connection')
const app = express();
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mainRouter = require('./routes/main')
const dashboardRouter = require('./routes/dashboard')
const bodyParser = require('body-parser')

const port = 3000

app.use(express.static('public'))

app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
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