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
 * Test if all the items saved to the database are returned
 */
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response).toHaveLength(helper.initialBlogs.length)
})

/**
 * Operations to run after each test session
 */
afterAll(() => {
  mongoose.connection.close()
})
