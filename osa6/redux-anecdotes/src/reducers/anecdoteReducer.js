import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = action.data
      const newState = state.map(anecdote =>
        anecdote.id === anecdoteToChange.id ? anecdoteToChange : anecdote
      )
      // order by votes
      return newState.sort((a, b) => b.votes - a.votes)
    case 'CREATE':
      const newAnecdote = action.data
      return state.concat(newAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer