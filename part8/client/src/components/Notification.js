import React from 'react'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <div style={{ color: 'red', padding: '1em 0' }}>{message}</div>
}

export default Notification
