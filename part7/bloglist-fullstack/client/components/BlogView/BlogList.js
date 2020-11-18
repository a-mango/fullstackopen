import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="">
      <h2>Saved blogs</h2>
      <ul>
        {blogs &&
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <li key={blog.title}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default BlogList
