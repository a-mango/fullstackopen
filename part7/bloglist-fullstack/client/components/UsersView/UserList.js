import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => (
  <div className="spacing w-full">
    <h2>Users</h2>
    <table className="table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Username</th>
          <th className="border px-4 py-2">Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, i) => (
            <tr
              key={user.username}
              className={i % 2 === 0 ? 'bg-blue-100' : null}
            >
              <td className="border px-4 py-2">
                <Link to={`users/${user.username}`}>{user.username}</Link>
              </td>
              <td className="border px-4 py-2">{user.blogs.length}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)

export default UserList
