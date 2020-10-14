import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  
  const { type, message } = notification

  return (
    <div>
      <p>
        <strong>{type}</strong>: {message}
      </p>
    </div>
  )
}

export default Notification
