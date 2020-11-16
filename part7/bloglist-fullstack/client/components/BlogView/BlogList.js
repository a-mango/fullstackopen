import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const style = {
    width: '35vw',
  }

  return (
    <div className="BlogList">
      <h2>Saved blogs</h2>
      <div style={style}>
        {blogs &&
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
              />
            ))}
      </div>
    </div>
  )
}

export default BlogList
