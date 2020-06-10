import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login, logged, logoff } from './reducers/loginReducer'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"
import { Container } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)
  const users = useSelector(state => state.user)
  const blogs = useSelector(state => state.blog)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logged(user))
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
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

  const userMatch = useRouteMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const selectedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (user === null) {
    return (
      <Container>
        <h2>log in to application</h2>
        <ErrorMessage />
        {loginForm()}
      </Container>
    )
  }


  return (
    <Container>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user.name} logged in <button onClick={() => logout()}>logout</button>
      </div>
      <Notification />
      <ErrorMessage />

      <h2>blog app</h2>

      <Switch>
        <Route path="/users/:id">
          <User user={selectedUser} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={selectedBlog} user={user} />
        </Route>
        <Route path="/">
          <BlogList user={user} />
        </Route>
      </Switch>
    </Container>
  )

}


export default App