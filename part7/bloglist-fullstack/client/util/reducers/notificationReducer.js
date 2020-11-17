const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

let timeoutId

const reducer = (state = '', action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case CLEAR_NOTIFICATION:
      return ''
    default:
      return state
  }
}

export const setNotification = (data, timeout = 10) => {
  return async dispatch => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(
      () => dispatch(clearNotification()),
      timeout * 1000
    )

    dispatch({
      type: SET_NOTIFICATION,
      data,
    })
  }
}

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
  }
}

export default reducer
