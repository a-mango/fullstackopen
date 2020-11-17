import blogService from 'Utilities/services/blogs'

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

export const setUser = user => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  blogService.setToken(user.token)
  return async dispatch => {
    dispatch({
      type: SET_USER,
      data: user,
    })
  }
}

export const clearUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return async dispatch => {
    dispatch({
      type: CLEAR_USER,
    })
  }
}

export default reducer
