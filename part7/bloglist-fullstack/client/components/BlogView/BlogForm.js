import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from 'Utilities/reducers/blogReducer'
import useField from 'Hooks/use-field'
import Togglable from 'Components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = event => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(blog, user))

    // Reset form state
    title.reset()
    author.reset()
    url.reset()

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
            reset=""
          />
        </label>
        <label className="block">
          <span className="">Author</span>
          <input
            className="form-input my-1 block w-full"
            placeholder="Jane Doe"
            {...author}
            reset=""
          />
        </label>
        <label className="block">
          <span className="">Url</span>
          <input
            className="form-input my-1 block w-full"
            placeholder="https://example.com"
            {...url}
            reset=""
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
