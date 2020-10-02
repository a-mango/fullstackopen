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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
