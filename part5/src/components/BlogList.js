import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => {
  const style = {
    width: '35vw',
  }

  return (
    <div>
      <h2>Saved blogs</h2>
      <div style={style}>
        {blogs && blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          ))}
      </div>
    </div>
  )
}

export default BlogList
