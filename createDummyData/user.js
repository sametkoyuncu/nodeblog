const User = require('../models/User')

const user_admin = {
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@mail.com',
  password: '123456',
}

async function dummyUser() {
  try {
    User.create(user_admin)
  } catch (e) {
    return console.log(e)
  }
}

module.exports = dummyUser
