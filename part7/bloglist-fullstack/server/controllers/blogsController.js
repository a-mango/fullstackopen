const { ApplicationError } = require('@util/customErrors')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('@models/blogModel')
const User = require('@models/userModel')
const Comment = require('@models/commentModel')

/**
 * Blog api get route
 */
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  response.json(blogs)
})

/**
 * Blog api create route
 */
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    throw new ApplicationError('Title and url are required', 400)
  }

  // Token presence check has to come before token decoding
  // otherwise it will always forward to the errorHandler middlware
  if (!request.token) {
    throw new ApplicationError('Token is missing or invalid', 401)
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    user: user.id,
    ...body,
  })
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

/**
 * Blog api comment post route
 */
blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  const body = request.body

  if (!body.message) {
    throw new ApplicationError('Field message is required', 400)
  }

  const blog = await Blog.findById(id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  const comment = new Comment({
    blog: blog.id,
    ...body,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment)
  await blog.save()

  response.status(201).json(blog)
})

/**
 * Blog api delete route
 */
blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    throw new ApplicationError('Token is missing or invalid', 401)
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedToken.id.toString() !== blog.user.toString()) {
    throw new ApplicationError('Unauthorized operation', 401)
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
    throw new ApplicationError('Title and url are required', 400)
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
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  response.json(updatedBlog)
})

module.exports = blogsRouter
