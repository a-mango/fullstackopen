import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users
            .map(user => (
              <tr key={user.username}>
                <td>
                  <Link to={`users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
      </tbody>
    </table>
  </div>
)

export default UserList
