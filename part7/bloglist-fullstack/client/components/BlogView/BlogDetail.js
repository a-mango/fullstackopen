import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from 'Utilities/reducers/blogReducer'
import CommentList from 'Components/BlogView/CommentList'
import CommentForm from 'Components/BlogView/CommentForm'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)

  if (!blog) {
    return null
  }

  const addLike = () => {
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    )
  }

  const removeBlog = () => {
    if (window.confirm(`Do you really wish to delete blog ${blog.title} ?`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }

  return (
    <div className="spacing">
      <h2>
        {blog.title} {blog.author && `by ${blog.author}`}
      </h2>
      <a className="block pb-4" href={blog.url}>
        {blog.url}
      </a>
      <div className="mb-6">
        <p className="text-blue-500 border border-blue-500 shadow px-2 font-bold rounded inline">
          {blog.likes} likes
        </p>
        <button className="button ml-2" onClick={addLike}>
          Like
        </button>
        {user && blog.user.username === user.username ? (
          <button className="button bg-red-500 ml-2" onClick={removeBlog}>
            Delete
          </button>
        ) : null}
      </div>
      <CommentList comments={blog.comments} />
      <CommentForm blog={blog} />
    </div>
  )
}

export default BlogDetail
