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
  const body = request.body

  const saltRounds = 10

  body.passwordHash = body.password
    ? await bcrypt.hash(body.password, saltRounds)
    : null

  if (body.passwordHash) {
    delete body.password
  }

  const user = new User(body)

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
