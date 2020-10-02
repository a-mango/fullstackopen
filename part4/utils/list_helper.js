var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let blogWithMostLikes = blogs[0]

  // Iterate through the blogs array to find the maximum blog.likes value
  blogs.forEach((blog) => {
    blog.likes > blogWithMostLikes.likes ? (blogWithMostLikes = blog) : false
  })

  return blogWithMostLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Pass the blogs array to the lodash constructor
  const blogsByAuthor = _(blogs)
    .groupBy('author') // Group collections item by author key
    .map((posts, author) => ({ author, blogs: posts.length }))
    .value()

  // Find the author with the maximum number of blogs
  // in the blogsByAuthor collection
  const authorWithMostBlogs = _.maxBy(blogsByAuthor, 'blogs')

  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
