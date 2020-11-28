import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from 'Utilities/reducers/blogReducer'
import useField from 'Hooks/use-field'
import Togglable from 'Components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const blogFormRef = useRef()

  if (!user) {
    return null
  }

  const addBlog = event => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(blog, user))

    // Reset form state
    resetTitle()
    resetAuthor()
    resetUrl()

    // Toggle blog form
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
      <h3 className="text-lg mb-4">Add a new blog</h3>
      <form onSubmit={addBlog}>
        <label className="block">
          <span className="">Title</span>
          <input
            className="form-input my-1 block w-full"
            placeholder="Insert blog title"
            {...title}
          />
        </label>
        <label className="block">
          <span className="">Author</span>
          <input
            className="form-input my-1 block w-full"
            placeholder="Jane Doe"
            {...author}
          />
        </label>
        <label className="block">
          <span className="">Url</span>
          <input
            className="form-input my-1 block w-full"
            placeholder="https://example.com"
            {...url}
          />
        </label>
        <button type="submit" className="button my-2">
          Add blog
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm
