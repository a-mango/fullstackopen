import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from 'Utilities/reducers/blogReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

import Nav from 'Components/Nav'
import Footer from 'Components/Footer'
import Notification from 'Components/Notification'
import BlogForm from 'Components/BlogView/BlogForm'
import LoginForm from 'Components/LoginForm'
import LogoutForm from 'Components/LogoutForm'
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

  return (
    <div>
      <Nav />
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <LogoutForm />
          <BlogForm />
          <BlogList />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
