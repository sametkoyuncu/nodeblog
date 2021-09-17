const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  content: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema)
