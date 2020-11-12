let timeoutId

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(
      () => dispatch(clearNotification()),
      timeout * 1000
    )
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default reducer
