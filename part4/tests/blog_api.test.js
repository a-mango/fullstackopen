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
 * Test if the correct amount of items saved in the database is
 * returned in JSON format
 */
test('correct amount of blogs is returned in JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

/**
 * Operations to run after each test session
 */
afterAll(() => {
  mongoose.connection.close()
})
