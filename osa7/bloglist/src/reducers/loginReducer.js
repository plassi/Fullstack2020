import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'
import { initializeUsers } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGGED':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (props) => {

  return async dispatch => {
    try {
      const user = await loginService.login(
        { username: props.username, password: props.password }
      )
      dispatch({
        type: 'LOGGED',
        data: user
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setNotification(`logged in as ${props.username}`, 5))
      dispatch(initializeUsers())
      dispatch(initializeBlogs())

    } catch (e) {
      dispatch(setError('wrong credentials', 5))
    }
  }
}

export const logged = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGGED',
      data: user
    })
    blogService.setToken(user.token)
  }
}

export const logoff = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
    window.localStorage.removeItem('loggedBlogappUser')
  }
}

export default reducer