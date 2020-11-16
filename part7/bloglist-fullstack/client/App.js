import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from 'Utilities/reducers/blogReducer'
import { setUser } from 'Utilities/reducers/userReducer'

import blogService from 'Utilities/services/blogs'
import loginService from 'Utilities/services/login'

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
      // Raise notification
    } catch (exception) {
      // Raise notification
    }
  }, [dispatch])

  useEffect(() => {
    try {
      const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJson) {
        const user = JSON.parse(loggedUserJson)
        dispatch(setUser(user))
        // Raise notification
      }
    } catch (exception) {
      // Raise notification
    }
  }, [dispatch])

  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  /**
   * Handles the display of a notification message
   */
  const handleNotification = (type, message) => {
    setNotification({
      type,
      message,
    })
    setTimeout(() => setNotification(null), 6000)
  }

  /**
   * Handle login of the user by making a call to the
   * login api and saving the returned user to state
   * and localStorage
   */
  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)

      // Save user to local storage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      // Set the user's token in blogService
      blogService.setToken(user.token)

      // Modify app state
      setUser(user)

      // Notify user
      handleNotification('Success', `Authenticated as ${user.username}`)
    } catch (exception) {
      handleNotification(
        'Error',
        'Authentication failed. Verify the username and password and try again'
      )
    }
  }

  /**
   * Handle logout of the user by clearing both
   * state and localStorage
   */
  const handleLogout = () => {
    // Clear localStorage of user item
    window.localStorage.removeItem('loggedBlogAppUser')
    // Reset state
    setUser(null)

    handleNotification('Success', 'User logged out')
  }

  /**
   * Handle addition of a blog
   */
  const addBlog = async blogObject => {
    try {
      // Post the data to the server
      const returnedBlog = await blogService.create(blogObject)

      // Update returnedBlog with user.username instead of id
      const addedBlog = {
        ...returnedBlog,
        user: {
          username: user.username,
        },
      }

      // Update state
      setBlogs(blogs.concat(addedBlog))

      // Toggle blog form
      blogFormRef.current.toggleVisibility()

      // Notify the user
      handleNotification('Success', 'A new blog was added to the database')
    } catch (exception) {
      handleNotification(
        'Error',
        'There was a problem while adding a blog to the database'
      )
    }
  }

  /**
   * Form components
   */
  const loginForm = () => <LoginForm loginUser={handleLogin} />

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
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
      <Notification notification={notification} />
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
