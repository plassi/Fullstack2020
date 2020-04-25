const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (...params) => {

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: params[0]
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, params[1] * 1000)
  }
}

export default reducer