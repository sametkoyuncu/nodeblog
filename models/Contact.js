const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    content: { type: String, default: 'Açıklama yok..' },
    email: { type: String, default: 'Açıklama yok..' },
    phone: { type: String, default: 'Açıklama yok..' },
    address: { type: String, default: 'Açıklama yok..' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contact', ContactSchema)
