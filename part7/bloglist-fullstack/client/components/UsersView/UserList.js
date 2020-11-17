import React from 'react'
import useResource from 'Hooks/use-resource'
import {apiUrl} from 'Utilities/common'

const UserList = () => {
  const [users, userService] = useResource(`${apiUrl}/users`)

  return (
    <div>
      {
        users.map(user => (<p>{user.username}</p>))
      }
    </div>
  )
}

export default UserList
