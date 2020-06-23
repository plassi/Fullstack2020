import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache"
  })

  const [filter, setFilter] = useState('all genres')

  if (!props.show) {
    return null
  }

  if (!result.data) {
    return (null)
  }

  const books = result.data.allBooks

  let genres = []
  books.map(book => book.genres.map(genre => genres.includes(genre) ? null : genres.push(genre)))

  const handleFilter = (event) => {
    event.preventDefault()

    setFilter(event.target.value)
  }

  const activeButtonStyle = {
    borderColor: 'lightblue'
  }

  const Filter = () => {
    return (
      genres.map(genre => {
        return <button onClick={handleFilter} style={filter === genre ? activeButtonStyle : null} value={genre} key={genre}>{genre}</button>
      })
    )
  }

  return (
    <div>
      <h2>books</h2>
  in genre <b>{filter}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            if (filter === 'all genres') {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            } else {
              if (a.genres.includes(filter)) {
                return (
                  <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
                )
              }
            }
            return null
          }
          )}
        </tbody>
      </table>
      <Filter />
      <button onClick={handleFilter} style={filter === "all genres" ? activeButtonStyle : null} value="all genres">all genres</button>
    </div>
  )
}

export default Books