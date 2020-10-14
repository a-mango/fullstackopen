import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  /**
   * Fetch all blogs when app is rendered
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
    }
  }, [])

  /**
   * Handle login of the user by making a call to the
   * login api and saving the returned user to state 
   * and localStorage
   */
  const handleLogin = async event => {
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      // Save user to local storage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      // Set the user's token in blogService
      blogService.setToken(user.token)

      // Modify app state
      setUser(user)
      setUsername('')
      setPassword('')

      console.log(`Authenticated as ${user.username}`)
    } catch {
      console.error('Authentication failed: wrong credentials')
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
    
    console.log(`User logged out`)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  // Show the login form if user is not authenticated
  if (user === null) {
    return (
      <div>
        <h1>Log in to the application</h1>
        {loginForm()}
      </div>
    )
  }

  // Show all blogs when user is logged in
  return (
    <div>
      <h1>Blogs</h1>
      <p>Logged in as {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
