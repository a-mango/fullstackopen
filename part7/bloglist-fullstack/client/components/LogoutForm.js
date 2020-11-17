import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from 'Utilities/reducers/userReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(
      setNotification({
        type: 'info',
        message: 'Successfully logged out',
      })
    )
  }

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutForm
