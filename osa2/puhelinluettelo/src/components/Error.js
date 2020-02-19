import React from 'react'
import './components.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message error">
      {message}
    </div>
  )
}

export default Notification