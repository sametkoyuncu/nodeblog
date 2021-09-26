const Category = require('../models/Category')

const category_1 = {
  name: 'NodeJS',
  description: 'Category for node.js.',
}

const category_2 = {
  name: 'MongoDB',
  description: 'Category for MongoDB.',
}

async function dummyCategory() {
  try {
    await Category.create(category_1)
    await Category.create(category_2)
  } catch (e) {
    return console.log(e)
  }
}

module.exports = dummyCategory
