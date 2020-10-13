const Blog = require('../models/blog')
const User = require('../models/user')

const blogApi = '/api/blogs'
const userApi = '/api/users'

/**
 * Initial blogs used for testing
 */
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

/**
 * New blog used for testing
 */
const newBlog = {
  title: 'How to Write a Git Commit Message',
  author: 'Chris Beam',
  url: 'https://chris.beams.io/posts/git-commit/',
  likes: 1,
}

const blogWithMissingOptionalData = {
  title: 'Jest array object match contains',
  author: 'Hugo',
  url: 'https://codewithhugo.com/jest-array-object-match-contain/',
}

const blogWithInvalidData = {
  author: 'Hugo',
  likes: 4,
}

const initialUsers = [
  {
    username: 'thegray00',
    name: 'Gandalf',
    password: 'openup',
  },
  {
    username: 'bigp',
    name: 'Pippin',
    password: 'carrot'
  }
]

/**
 * Generates a non existing mongoose id
 */
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will be removed',
    author: 'unknown',
    url: 'to/nowhere',
    likes: 0,
  })

  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

/**
 * Fetches all blogs in the database
 */
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/**
 * Fetches all users in the database
 */
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}



module.exports = {
  blogApi,
  userApi,
  initialBlogs,
  newBlog,
  blogWithMissingOptionalData,
  blogWithInvalidData,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
