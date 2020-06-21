import React from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE, BOOKS_WITH_GENRE } from '../queries'

const Recommend = (props) => {
  
  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const favResult = useQuery(FAVORITE_GENRE)
  
  const favoriteGenre = !favResult.data ? '' : favResult.data.me.favoriteGenre

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bookResults = useQuery(BOOKS_WITH_GENRE, {
    variables: { genre: favoriteGenre }
  })

  if (!favResult.data || !bookResults.data) {
    return (null)
  } 
  
  const books = bookResults.data.allBooks

  return (
    <div>
      <h2>books</h2>
  in your favorite genre <b>{favResult.data.me.favoriteGenre}</b>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend