import React from 'react'
import { useSelector } from 'react-redux'
import './components.css'

const Notification = () => {

  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

export default Notification