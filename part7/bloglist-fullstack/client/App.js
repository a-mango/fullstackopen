import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from 'Utilities/reducers/blogReducer'
import { setUser, clearUser } from 'Utilities/reducers/userReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

import Nav from 'Components/Nav'
import Footer from 'Components/Footer'
import Notification from 'Components/Notification'
import Togglable from 'Components/Togglable'
import BlogForm from 'Components/BlogView/BlogForm'
import LoginForm from 'Components/LoginForm'
import BlogList from 'Components/BlogView/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    try {
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'An error has occured while fetching the data',
        })
      )
    }
  }, [dispatch])

  const blogFormRef = useRef()

  /**
   * Handle logout of the user by clearing both
   * state and localStorage
   */
  const handleLogout = () => {
    dispatch(clearUser())

    dispatch(
      setNotification({
        type: 'info',
        message: 'Successfully logged out',
      })
    )
  }

  /**
   * Form components
   */
  const loginForm = () => <LoginForm />

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
      <BlogForm toggleRef={blogFormRef} />
    </Togglable>
  )

  const logoutForm = () => (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

  // Show login form if user is not logged in,
  // otherwise show blog list and controls
  return (
    <div>
      <Nav />
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {logoutForm()}
          {blogForm()}
          <BlogList />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
