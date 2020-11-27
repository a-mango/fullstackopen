import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const { buttonLabel, children } = props

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(visible => !visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div className="spacing w-56">
      <div style={hideWhenVisible}>
        <button className="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div className="" style={showWhenVisible}>
        {children}
        <button className="button" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
