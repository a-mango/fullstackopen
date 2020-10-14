const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = {
  username: 'Aracorn',
  password: 'bigelf123',
}

let token

/**
 * Operations to run before each test session
 */
beforeEach(async () => {
  // Clear the database
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Create a user to link the blogs to
  const newUser = await api.post(helper.userApi).send(testUser)

  // Authorize the user
  const authorization = await api.post('/api/login').send({
    username: testUser.username,
    password: testUser.password,
  })

  token = authorization.body.token

  // Create an array of Blog models using initialBlogs
  const blogObjects = helper.initialBlogs.map(
    blog =>
      new Blog({
        user: newUser.id,
        ...blog,
      })
  )
  // Create an array of promises
  const promiseArray = blogObjects.map(blog => blog.save())
  // Execute all promises
  await Promise.all(promiseArray)
})

/**
 * Tests for the api GET route
 */
describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get(helper.blogApi)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(helper.blogApi)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the id property is defined', async () => {
    const response = await api.get(helper.blogApi)

    expect(response.body[0].id).toBeDefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get(helper.blogApi)

    expect(response.body).toContainEqual(
      expect.objectContaining({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      })
    )
  })
})

/**
 * Tests for the api GET route with id
 */
describe('viewing a specific blog', () => {
  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`${helper.blogApi}/${validNonexistingId}`).expect(404)
  })
})

/**
 * Tests for the api POST route
 */
describe('addition of a new blog', () => {
  test('succeeds with status code 201 when data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog))
  })

  test('uses default values when optional data is missing', async () => {
    const blog = helper.blogWithMissingOptionalData

    await api
      .post(helper.blogApi)
      .set('Authorization', `bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

    expect(lastBlog.likes).toBe(0)
  })

  test('fails with status code 400 when data is invaild', async () => {
    await api.post(helper.blogApi).send(helper.blogWithInvalidData).expect(400)
  })

  test('fails with status code 401 when token is missing', async () => {
    await api.post(helper.blogApi).send(helper.newBlog).expect(401)
  })
})

/**
 * Tests for the api DELETE route
 */
describe('deletion of a blog', () => {
  test('succeeds with status code 204 when id and token are valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Sporuman',
      url: 'is.en.gard',
    }

    const savedBlog = await api
      .post(helper.blogApi)
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    await api
      .delete(`${helper.blogApi}/${savedBlog.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(newBlog))
  })

  test('fails with status code 404 when resource does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`${helper.blogApi}/${validNonexistingId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

/**
 * Tests for the blog api PUT route
 */
describe('updation of a blog', () => {
  test('succeeds with status code 200 when data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.author = 'Linus Thorvalds'
    blogToUpdate.title = 'Pearls before swine...'
    blogToUpdate.url =
      'http://torvalds-family.blogspot.com/2011/02/pearls-before-swine.html'
    blogToUpdate.likes = 192

    await api
      .put(`${helper.blogApi}/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 400 when data is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.title = null
    blogToUpdate.url = null

    await api
      .put(`${helper.blogApi}/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400)
  })
})

/**
 * Operations to run after each test session
 */
afterAll(() => {
  mongoose.connection.close()
})
