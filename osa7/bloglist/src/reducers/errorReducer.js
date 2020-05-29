const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.data
    case 'CLEAR_ERROR':
      return null
    default:
      return state
  }
}

export const setError = (...params) => {

  return async dispatch => {
    dispatch({
      type: 'SET_ERROR',
      data: params[0]
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_ERROR'
      })
    }, params[1] * 1000)
  }
}

export default reducer