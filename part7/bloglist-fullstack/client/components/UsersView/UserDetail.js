import React from 'react'
import { Link, useParams } from 'react-router-dom'

const UserDetail = ({ users }) => {
  const { username } = useParams()
  const user = users.find(u => u.username === username)

  if (!user) {
    return null
  }

  return (
    <div className="spacing w-full">
      <h2>{user.username}</h2>
      {user.blogs.length === 0 ? (
        <h3>No blogs found.</h3>
      ) : (
        <div>
          <h3>Added blogs:</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.title}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserDetail
