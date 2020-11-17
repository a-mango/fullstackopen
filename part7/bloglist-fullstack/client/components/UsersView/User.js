import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const { id } = useParams()
  console.log(id)
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
    </div>
  )
}

export default User
