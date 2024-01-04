const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = password ? await bcrypt.hash(password, saltRounds) : null

  const user = new User({
    username,
    name,
  })

  if (passwordHash) {
    user.passwordHash = passwordHash
  }

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
