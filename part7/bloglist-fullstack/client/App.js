import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from 'Utilities/reducers/blogReducer'
import { setNotification } from 'Utilities/reducers/notificationReducer'

import Nav from 'Components/Nav'
import Notification from 'Components/Notification'
import Footer from 'Components/Footer'
import Router from 'Components/Router'
import BlogView from 'Components/BlogView'
import UsersView from 'Components/UsersView'
import LoginForm from 'Components/LoginForm'
import LogoutForm from 'Components/LogoutForm'

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
      {user === null ? <LoginForm /> : <LogoutForm />}
      <Router />
      <Footer />
    </div>
  )
}

export default App
