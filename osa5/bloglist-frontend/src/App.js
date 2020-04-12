import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      setNotificationMessage(`logged in as ${username}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <ErrorMessage message={errorMessage} />
        {loginForm()}
      </>
    )

  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
      <BlogList user={user}/>
    </div>
  )

}


export default App