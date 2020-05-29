import React from 'react'
import { useSelector } from 'react-redux'
import './components.css'

const ErrorMessage = () => {

  const message = useSelector(state => state.error)

  if (message === null) {
    return null
  }

  return (
    <div className='message error'>
      {message}
    </div>
  )
}

export default ErrorMessage