import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  /**
   * Fetch all blogs when app is rendered
   * and sort them by likes
   */
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  /**
   * Try to login the user with data stored in localStorage
   * when app is rendered
   */
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      handleNotification(
        'Info',
        `Automatically authenticated as ${user.username}`
      )
    }
  }, [])

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
        `Authentication failed. Verify the username and password and try again`
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

    handleNotification('Success', `User logged out`)
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
          username: user.username
        }
      }

      // Update state
      setBlogs(blogs.concat(addedBlog))

      // Toggle blog form
      blogFormRef.current.toggleVisibility()

      // Notify the user
      handleNotification('Success', `A new blog was added to the database`)
    } catch (exception) {
      handleNotification(
        'Error',
        'There was a problem while adding a blog to the database'
      )
    }
  }

  /**
   * Handle updation of a blog
   */
  const updateBlog = async updatedBlog => {
    try {
      // Put request via blogService
      const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
      console.log(returnedBlog)

      // Replace updated blog in state
      setBlogs(
        blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog))
      )

      handleNotification('Success', `Blog "${returnedBlog.title}" was updated`)
    } catch (exception) {
      handleNotification('Error', 'There was a problem while updating the blog')
    }
  }

  /**
   * Handle removal of a blog
   */
  const removeBlog = async id => {
    try {
      // Remove blog through blogService
      blogService.remove(id)

      // Filter the deleted blog out of app state
      setBlogs(blogs.filter(blog => blog.id !== id))

      handleNotification('Success', `Blog was deleted`)
    } catch (exception) {
      handleNotification('Error', 'There was a problem while deleting the blog')
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
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {logoutForm()}
          {blogForm()}
          <BlogList
            blogs={blogs}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default App
