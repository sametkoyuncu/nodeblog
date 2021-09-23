const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema(
  {
    content: { type: String, default: 'Açıklama yok..' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('About', AboutSchema)
