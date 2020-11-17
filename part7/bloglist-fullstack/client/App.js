import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from 'Utilities/reducers/blogReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

import Nav from 'Components/Nav'
import Footer from 'Components/Footer'
import Notification from 'Components/Notification'
import Togglable from 'Components/Togglable'
import BlogForm from 'Components/BlogView/BlogForm'
import LoginForm from 'Components/LoginForm'
import LogoutForm from 'Components/LogoutForm'
import BlogList from 'Components/BlogView/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

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

  return (
    <div>
      <Nav />
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <LogoutForm />
          <Togglable buttonLabel="Add blog" ref={blogFormRef}>
            <BlogForm toggleRef={blogFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
