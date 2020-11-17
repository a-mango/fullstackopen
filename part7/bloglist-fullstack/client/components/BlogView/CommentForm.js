import React from 'react'
import { useDispatch } from 'react-redux'
import useField from 'Hooks/use-field'
import { createComment } from 'Utilities/reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const message = useField('text')

  const addComment = event => {
    event.preventDefault()
    dispatch(createComment(blog, message.value))
    message.reset()
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <input {...message} reset={null} />
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
