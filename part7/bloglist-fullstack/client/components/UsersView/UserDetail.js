import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetail = ({ users }) => {
  const { id } = useParams()
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
