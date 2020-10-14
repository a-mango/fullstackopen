const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

/**
 * Blog api get route
 */
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

/**
 * Blog api create route
 */
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'missing title or url' })
  }

  // Token precense check has to come before token decoding
  // otherwise it will always forware to the errorHandler middlware
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    user: user.id,
    ...body,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

/**
 * Blog api delete route
 */
blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    response.status(404).end()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'unauthorized operation' })
  }

  blog.delete()

  response.status(204).end()
})

/**
 * Blog api put route
 */
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'missing title or url' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updatedBlog)
})

module.exports = blogsRouter
