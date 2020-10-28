const reducer = (state = 'TEST', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const addNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message,
    },
  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default reducer
