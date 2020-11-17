import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'Utilities/reducers/userReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'
import loginService from 'Utilities/services/login'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      dispatch(setUser(user))
      setUsername('')
      setPassword('')

      dispatch(
        setNotification({
          type: 'success',
          message: `Successfully logged in as ${username}`,
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          type: 'error',
          message: `An error has occured while attempting to log in`,
        })
      )
    }
  }

  return (
    <div>
      <h2>Log in to the application</h2>

      <form id="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="login-username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="login-password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
