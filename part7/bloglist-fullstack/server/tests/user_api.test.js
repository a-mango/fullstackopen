const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../index')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('@models/userModel')

/**
 * Operations to run before each session
 */
beforeEach(async () => {
  await User.deleteMany({})

  const usersWithHashedPasswords = await Promise.all(
    helper.initialUsers.map(async user => {
      const passwordHash = await bcrypt.hash(user.password, 10)

      return {
        username: user.username,
        name: user.name,
        passwordHash,
      }
    })
  )

  const userObjects = usersWithHashedPasswords.map(
    user =>
      new User({
        ...user,
      })
  )

  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

/**
 * Test the read function of the user API
 */
describe('when there are initially some users in db', () => {
  test('users are returned as json', async () => {
    await api
      .get(helper.userApi)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get(helper.userApi)

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('a specific user is within the returned users', async () => {
    const response = await api.get(helper.userApi)

    expect(response.body).toContainEqual(
      expect.objectContaining({
        username: 'thegray00',
        name: 'Gandalf',
      })
    )
  })
})

/**
 * Test the create function of the user API
 */
describe('addition of an user', () => {
  test('succeeds with valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'amango',
      name: 'Albiricu Mangolo',
      password: 'mangoes',
    }

    await api
      .post(helper.userApi)
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with status code 400 and returns appropriate error when data is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: '',
      password: '',
    }

    const result = await api
      .post(helper.userApi)
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(result.body.error).toBe('Username and password are required')
  })

  test('fails with status code 400 and returns appropriate error when data is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'am',
      password: '12',
    }

    const result = await api
      .post(helper.userApi)
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(result.body.error).toBe(
      'Username and password must be at least 3 characters long'
    )
  })
})

/**
 * Operations to run after each test session
 */
afterAll(() => {
  mongoose.connection.close()
})
