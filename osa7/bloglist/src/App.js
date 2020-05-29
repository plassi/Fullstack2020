import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { setError } from './reducers/errorReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(setNotification(`logged in as ${username}`, 5))
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(setError('wrong credentials', 5))
    }
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
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
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