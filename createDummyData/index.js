const dummyUser = require('./user')
const dummyCategory = require('./category')
const dummyPost = require('./post')
const { dummyAbout, dummyContact } = require('./pages')

const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')
const About = require('../models/About')
const Contact = require('../models/Contact')

async function main() {
  try {
    const users = await User.find({}).then((users) => {
      return users
    })
    const categories = await Category.find({}).then((categories) => {
      return categories
    })
    const posts = await Post.find({}).then((posts) => {
      return posts
    })
    const abouts = await About.find({}).then((abouts) => {
      return abouts
    })
    const contacts = await Contact.find({}).then((contacts) => {
      return contacts
    })

    if (users.length < 1) {
      dummyUser()
    }

    if (categories.length < 1) {
      dummyCategory()
    }

    if (posts.length < 1) {
      dummyPost()
    }

    if (abouts.length < 1) {
      dummyAbout()
    }

    if (contacts.length < 1) {
      dummyContact()
    }
  } catch (e) {
    return console.log(e)
  }
}
main()
