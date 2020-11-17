import React from 'react'
import useResource from 'Hooks/use-resource'
import { apiUrl } from 'Utilities/common'

const UserList = () => {
  const [users, userService] = useResource(`${apiUrl}/users`)
  console.log(users)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
