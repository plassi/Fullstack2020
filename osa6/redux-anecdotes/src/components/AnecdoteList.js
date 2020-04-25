import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        // filter the content
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
          ?
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                dispatch(voteAnecdote(anecdote.id))
                dispatch(setNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  dispatch(clearNotification())
                }, 5000)
              }
              }
              >vote</button>
            </div>
          </div>
          : null
      )}
    </>
  )
}

export default AnecdoteList