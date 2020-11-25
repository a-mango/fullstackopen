import blogService from 'Utilities/services/blogs'
import loginService from 'Utilities/services/login'
import { setNotification } from 'Utilities/reducers/notificationReducer'

const SET_USER = 'SET_USER'
const CLEAR_USER = 'CLEAR_USER'

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.data
    case CLEAR_USER:
      return null
    default:
      return state
  }
}

export const setUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: SET_USER,
        data: user,
      })
      dispatch(
        setNotification({
          type: 'success',
          message: `Logged in as ${user.username}`,
        })
      )
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while logging in',
        })
      )
    }
  }
}

export const clearUser = () => {
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      dispatch({
        type: CLEAR_USER,
      })
      dispatch(
        setNotification({
          type: 'success',
          message: 'Logged out',
        })
      )
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while logging out',
        })
      )
    }
  }
}

export default reducer
