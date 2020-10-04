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
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  Promise.all(promiseArray)
})

/**
 * Operations to run after each test session
 */
afterAll(() => {
  mongoose.connection.close()
})
