const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('@util/logger')
const blogsRouter = require('@controllers/blogsController')
const usersRouter = require('@controllers/usersController')
const loginRouter = require('@controllers/loginController')
const middleware = require('@middleware')

const { MONGODB_URI } = require('@util/common')

logger.info('Connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/blogs', blogsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('@controllers/testingController')
  app.use('/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
