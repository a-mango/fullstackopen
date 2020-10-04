const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/**
 * Operations to run before each test session
 */
beforeEach(async () => {
  // Clear the database
  await Blog.deleteMany({})

  // Create an array of Blog models using initialBlogs
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // Create an array of promises
  const promiseArray = blogObjects.map(blog => blog.save())
  // Execute all promises
  await Promise.all(promiseArray)
})

/**
 * Test if the correct amount of blogs saved in the database is
 * returned in JSON format
 */
test('the correct amount of blogs is returned in the right format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

/**
 * Test if the unique identifier of a blog is named id
 */
test('the id field is defined', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]

  expect(blog.id).toBeDefined()
})

/**
 * Test if a blog can be added
 */
test('a blog can be added', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'How to Write a Git Commit Message',
    author: 'Chris Beam',
    url: 'https://chris.beams.io/posts/git-commit/',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog))
})

/**
 * Test if a blog with missing likes property defaults to 0
 */
test('a blog with missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'How to Write a Git Commit Message',
    author: 'Chris Beam',
    url: 'https://chris.beams.io/posts/git-commit/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

  expect(lastBlog.likes).toBe(0)
})

/**
 * Test if a blog post request with missing title or author
 * returnds a 400 response
 */
test('a blog with missing title or author property returns a 400 Bad Request code', async () => {
  const newBlog = {
    url: 'https://chris.beams.io/posts/git-commit/',
    likes: 1,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

/**
 * Operations to run after each test session
 */
afterAll(() => {
  mongoose.connection.close()
})
