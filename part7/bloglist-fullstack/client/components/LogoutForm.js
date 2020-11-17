import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from 'Utilities/reducers/userReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!user) {
    return null
  }

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
    <span className="logout-form">
      Logged in as {user.username}
      <button onClick={handleLogout}>Logout</button>
    </span>
  )
}

export default LogoutForm
