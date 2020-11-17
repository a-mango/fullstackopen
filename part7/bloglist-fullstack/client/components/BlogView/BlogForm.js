import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from 'Utilities/reducers/blogReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'
import Togglable from 'Components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    try {
      dispatch(
        createBlog(
          {
            title,
            author,
            url,
          },
          user
        )
      )

      // Reset form state
      setTitle('')
      setAuthor('')
      setUrl('')

      // Toggle blog form
      blogFormRef.current.toggleVisibility()

      dispatch(
        setNotification({
          type: 'success',
          message: 'A new blog was successfuly added to the database',
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'An error has occured while adding the blog to the database',
        })
      )
    }
  }

  return (
    <Togglable buttonLabel="Add blog" ref={blogFormRef} className="BlogForm">
      <h2>Add a new blog</h2>

      <form id="blog-form" onSubmit={addBlog}>
        <fieldset>
          <div>
            <label htmlFor="blog-title">Title:</label>
            <input
              id="blog-title"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <label htmlFor="blog-author">Author:</label>
            <input
              id="blog-author"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label htmlFor="blog-url">Url:</label>
            <input
              id="blog-url"
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="blog-submit" type="submit">
            Add blog
          </button>
        </fieldset>
      </form>
    </Togglable>
  )
}

export default BlogForm
