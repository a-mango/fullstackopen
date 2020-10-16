import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog, removeBlog }) => {
  const style = {
    width: '35vw',
  }

  return (
    <div className='BlogList'>
      <h2>Saved blogs</h2>
      <div style={style}>
        {blogs && blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
          ))}
      </div>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.shape().isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default BlogList
