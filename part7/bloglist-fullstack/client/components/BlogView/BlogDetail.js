import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from 'Utilities/reducers/blogReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'
import CommentList from 'Components/BlogView/CommentList'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)

  if (!blog || !user) {
    return null
  }

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

  return (
    <div className="blog-detail">
      <h2>
        {blog.title} {blog.author && `by ${blog.author}`}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <div>
        <button onClick={addLike}>Like</button>
        {blog.user.username === user.username ? (
          <button onClick={removeBlog}>Delete</button>
        ) : null}
      </div>
      <CommentList comments={blog.comments} />
    </div>
  )
}

export default BlogDetail
