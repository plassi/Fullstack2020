const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      // order by votes
      return newState.sort((a, b) => b.votes - a.votes)
    case 'CREATE':
      const newAnecdote = action.data
      console.log(newAnecdote);  
      return state.concat(newAnecdote)
    case 'INIT_ANECDOTES':
      console.log(action.data);
      
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer