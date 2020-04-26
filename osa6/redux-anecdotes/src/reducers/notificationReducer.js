const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.length > 0) {
        clearTimeout(state[1])
      }
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (...params) => {

  const timeOut = (dispatch, time) => setTimeout(() => {
    dispatch({
      type: 'CLEAR_NOTIFICATION'
    })
  }, time * 1000)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: [params[0], timeOut(dispatch, params[1])]
    })  
  }
}

export default reducer