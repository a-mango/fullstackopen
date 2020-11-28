import React from 'react'
import { useDispatch } from 'react-redux'
import useField from 'Hooks/use-field'
import { createComment } from 'Utilities/reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const { reset: resetMessage, ...message } = useField('text')

  const addComment = event => {
    event.preventDefault()
    dispatch(createComment(blog, message.value))
    message.reset()
  }

  return (
    <div className="my-4">
      <h3>Add a comment</h3>
      <form onSubmit={addComment}>
        <input {...message} />
        <button type="submit" className="button ml-2">
          Add
        </button>
      </form>
    </div>
  )
}

export default CommentForm
