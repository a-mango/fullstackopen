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
 * Tests for the api GET route
 */
describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get(helper.apiUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(helper.apiUrl)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the id property is defined', async () => {
    const response = await api.get(helper.apiUrl)

    expect(response.body[0].id).toBeDefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get(helper.apiUrl)

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
// describe('viewing a specific blog', () => {
//   test('suceeds with a valid id', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToView = blogsAtStart[0]

//     const resultBlog = await api
//       .get(`${helper.apiUrl}/${blogToView.id}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

//     expect(resultBlog.body).toEqual(processedBlogToView)
//   })

//   test('fails with status code 404 if blog does not exist', async () => {
//     const validNonexistingId = await helper.nonExistingId()

//     await api.get(`${helper.apiUrl}/${validNonexistingId}`).expect(404)
//   })

//   test('fails with status code 400 if id is invalid', async () => {
//     const invalidId = '29a32498ff102939e25'

//     await api.get(`${helper.apiUrl}/${invalidId}`).expect(400)
//   })
// })

/**
 * Tests for the api POST route
 */
describe('addition of a new blog', () => {
  test('succeeds with stauts code 201 when data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
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
      .post(helper.apiUrl)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

    expect(lastBlog.likes).toBe(0)
  })

  test('fails with status code 400 if data is invaild', async () => {
    await api.post(helper.apiUrl).send(helper.blogWithInvalidData).expect(400)
  })
})

/**
 * Tests for the api DELETE route
 */
describe('deletion of a blog', () => {
  test('succeeds with status code 204 when id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`${helper.apiUrl}/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(blogToDelete))
  })

  test('fails with status code 404 when resource does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.delete(`${helper.apiUrl}/${validNonexistingId}`).expect(404)
  })
})

describe('updation of a blog', () => {
  test('succeeds with status code 200 when data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.author = 'Linus Thorvals'
    blogToUpdate.title = 'Building a free operating system'
    blogToUpdate.likes = 192

    await api.put(`${helper.apiUrl}/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 400 when data is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.author = null
    blogToUpdate.title = null

    await api.put(`${helper.apiUrl}/${blogToUpdate.id}`)
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
