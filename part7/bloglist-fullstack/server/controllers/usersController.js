const { ApplicationError } = require('@util/customErrors')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('@models/userModel')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(body.username && body.password)) {
    throw new ApplicationError('Username and password are required', 400)
  }

  if (body.username.length < 3 || body.password.length < 3) {
    throw new ApplicationError(
      'Username and password must be at least 3 characters long',
      400
    )
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
