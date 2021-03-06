import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    // Reset form state
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="BlogForm">
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
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
