import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const { title, author, url, likes } = blog
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(visible => !visible)

  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Do you really wish to delete blog ${blog.title} ?`)) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #242424',
    padding: '0.2em',
    marginBottom: '0.4em',
  }

  return (
    <div className='Blog' style={blogStyle}>
      {visible ? (
        <div className='BlogDetail'>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{title}</td>
              </tr>
              <tr>
                <td>Author</td>
                <td>{author}</td>
              </tr>
              <tr>
                <td>URL</td>
                <td>
                  <a href={url}>{url}</a>
                </td>
              </tr>
              <tr>
                <td>Likes</td>
                <td>{likes}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={addLike}>Like</button>
          {blog.user.username === user.username ? (
            <button onClick={deleteBlog}>Delete</button>
          ) : null}
        </div>
      ) : (
        <div className='BlogSummary'>
          <p>
            {title} - {author}
          </p>
        </div>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
