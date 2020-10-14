import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`Authenticated as ${user.username}`)
    } catch {
      console.error('Authentication failed: wrong credentials')
    }
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

  /**
   * Show the login form if user is not authenticated
   */
  if (user === null) {
    return (
      <div>
        <h1>Log in to the application</h1>
        {loginForm()}
      </div>
    )
  }

  /**
   * Show all blogs when user is logged in
   */
  return (
    <div>
      <h1>Blogs</h1>
      <p>Logged in as {user.username}</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
