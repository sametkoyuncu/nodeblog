const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, uniqe: true },
    description: { type: String, default: "Açıklama yok.." },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Category", CategorySchema)
