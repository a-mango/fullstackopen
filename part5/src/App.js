import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      console.log(`Authenticated as ${user.username}`)
    }
  }, [])

  /**
   * Handle login of the user by making a call to the
   * login api and saving the returned user to state
   * and localStorage
   */
  const handleLogin = async event => {
    event.preventDefault()
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
    } catch (exception) {
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

  /**
   * Handle addition of a blog
   */
  const addBlog = async event => {
    event.preventDefault()

    // Create an object with data from form
    const blogObject = {
      title,
      author,
      url,
    }

    try {
      // Post the data to the server
      const returnedBlog = await blogService.create(blogObject)

      // Update state
      setBlogs(blogs.concat(returnedBlog))

      // Reset form state
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error('Blog creation failed')
    }
  }
  /**
   * Login form component
   */
  const loginForm = () => (
    <div>
      <h2>Log in to the application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  /**
   * Blog form component
   */
  const blogForm = () => (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )

  const logoutForm = () => (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

  // Show the login form if user is not authenticated
  if (user === null) {
    return loginForm()
  }

  // Show all blogs when user is logged in
  return (
    <div>
      <h1>Blogs</h1>
      {logoutForm()}
      {blogForm()}

      <h2>Saved blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
