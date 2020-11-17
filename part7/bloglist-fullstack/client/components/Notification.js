import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) {
    return null
  }
  const { type, message } = notification

  return (
    <div className="Notification">
      <p>
        <strong>{type}</strong>: {message}
      </p>
    </div>
  )
}

export default Notification
