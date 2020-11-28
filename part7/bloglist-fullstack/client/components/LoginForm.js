import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useField from 'Hooks/use-field'
import { setUser, loginUser } from 'Utilities/reducers/userReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      dispatch(
        setNotification({
          type: 'info',
          message: `Automatically logged in as ${user.username}`,
        })
      )
    }
  }, [dispatch])

  const handleLogin = event => {
    event.preventDefault()
    dispatch(
      loginUser({
        username: username.value,
        password: password.value,
      })
    )
    resetUsername()
    resetPassword()
  }

  return (
    <div className="spacing">
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" {...username} className="mr-2" />
        <input placeholder="Password" {...password} className="mr-2" />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
