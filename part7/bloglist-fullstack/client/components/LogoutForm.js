import React from 'react'
import { Link } from 'react-router-dom'
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
    <div className="inline">
      <p className="inline px-5">
        <svg
          className="inline h-5 pr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Link to={`/users/${user.username}`} className="nav-item px-0">
          {user.username}
        </Link>
      </p>
      <button className="button-inverted" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default LogoutForm
