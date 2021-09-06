const express = require('express')
const exphbs = require('express-handlebars');

const app = express()

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = 3000

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})