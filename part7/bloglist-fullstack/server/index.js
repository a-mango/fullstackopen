const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('@controllers/blogsController')
const usersRouter = require('@controllers/usersController')
const loginRouter = require('@controllers/loginController')
const middleware = require('@middleware')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('@util/common')

console.info('Connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.logger)
app.use(middleware.tokenExtractor)

app.use('/blogs', blogsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
