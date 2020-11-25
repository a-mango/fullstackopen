import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) {
    return null
  }

  const { type, message } = notification
  const color = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-blue-400'
    }
  }
  return (
    <div
      className={`py-2 px-2 mb-4 rounded-sm shadow transition duration-500 ease-in-out h-34 text-white ${color()}`}
    >
      {message}
    </div>
  )
}

export default Notification
