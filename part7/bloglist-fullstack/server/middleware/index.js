const morgan = require('morgan')

const logger = morgan('tiny')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  return next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message, error.name, error.extra)

  if (error.name === 'ApplicationError') {
    return res.status(error.status).send({ error: error.message })
  }

  res.status(500).send({ error: error.message })
  return next(error)
}

module.exports = {
  logger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
}
