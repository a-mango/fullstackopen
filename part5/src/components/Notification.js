import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const { type, message } = notification

  return (
    <div className='Notification'>
      <p>
        <strong>{type}</strong>: {message}
      </p>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })
}

export default Notification
