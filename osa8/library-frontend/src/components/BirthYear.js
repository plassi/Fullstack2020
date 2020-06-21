import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { SET_BIRTH, ALL_AUTHORS } from '../queries'

const BirthYear = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [setBirthYear] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    const bornInt = Number(born)

    setBirthYear({ variables: { name, born: bornInt } })

    setName(authors[0].name)
    setBorn('')
  }

  if (!authors) {
    return (null)
  }

  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name: <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
          </select>
        </div>
        <div>
          born: <input value={born}
            onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default BirthYear