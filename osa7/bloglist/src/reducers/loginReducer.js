import loginService from '../services/login'
import blogService from '../services/blogs'

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