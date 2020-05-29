import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import { setNotification } from './reducers/notificationReducer'
import { setError } from './reducers/errorReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logged, logoff } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logged(user))
    }
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
  }


  const loginForm = () => (
    <form id='login-form' onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logout = () => {
    dispatch(logoff())
  }


  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <ErrorMessage />
        {loginForm()}
      </>
    )

  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <ErrorMessage />
      <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
      <BlogList user={user} />
    </div>
  )

}


export default App