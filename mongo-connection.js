// getting-started.js
const mongoose = require('mongoose')
const connectionString =
  process.env.MONGODB_CONNECTION_STRING ||
  'mongodb+srv://nodeblog:node_blog_db@cluster0.4vcb8.mongodb.net/nodeblog?retryWrites=true&w=majority'
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('We are connected to mongodb!')
})
