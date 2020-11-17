import React from 'react'

const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments === null ? (
          <p>No comments available for this post</p>
        ) : (
          comments.map(comment => <li key={comment.id}>{comment.message}</li>)
        )}
      </ul>
    </div>
  )
}

export default CommentList
