import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from 'Utilities/reducers/blogReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(visible => !visible)
  const { title, author, url, likes } = blog

  const addLike = () => {
    try {
      dispatch(
        updateBlog({
          ...blog,
          likes: blog.likes + 1,
          user: blog.user.id,
        })
      )
      dispatch(
        setNotification({
          type: 'success',
          message: `A like was added to "${blog.title}"`,
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'An error has occured while updating the blog',
        })
      )
    }
  }

  const removeBlog = () => {
    try {
      if (window.confirm(`Do you really wish to delete blog ${blog.title} ?`)) {
        dispatch(deleteBlog(blog.id))
        dispatch(
          setNotification({
            type: 'success',
            message: `The blog "${blog.title}" was successfuly deleted`,
          })
        )
      }
    } catch (exception) {
      dispatch(
        setNotification({
          type: 'success',
          message: 'An error has occured while deleting the blog',
        })
      )
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
    <div className="Blog" style={blogStyle}>
      {visible ? (
        <div className="BlogDetail">
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
            <button onClick={removeBlog}>Delete</button>
          ) : null}
        </div>
      ) : (
        <div className="BlogSummary">
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
}

export default Blog
