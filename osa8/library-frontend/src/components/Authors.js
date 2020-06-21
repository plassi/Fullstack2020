import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import BirthYear from './BirthYear'

const Authors = (props) => {
  const response = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if (!response.data) {
    return(null)
  }

  const authors = response.data.allAuthors
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token ? <BirthYear authors={authors}/> : null}

    </div>
  )
}

export default Authors
