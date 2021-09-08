const express = require('express');
const exphbs = require('express-handlebars');
require('./mongo-connection')
const app = express();
const mainRouter = require('./routes/main')
const dashboardRouter = require('./routes/dashboard')
const bodyParser = require('body-parser')

const port = 3000

app.use(express.static('public'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', mainRouter)
app.use('/dashboard', dashboardRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})