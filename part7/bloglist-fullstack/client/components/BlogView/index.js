import React from 'react'
import BlogForm from 'Components/BlogView/BlogForm'
import BlogList from 'Components/BlogView/BlogList'

const BlogView = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default BlogView
