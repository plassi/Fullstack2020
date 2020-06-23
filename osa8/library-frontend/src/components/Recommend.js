import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { BOOKS_WITH_GENRE, USER_DATA } from '../queries'


const Recommend = (props) => {

  const [getBooks, bookResult] = useLazyQuery(BOOKS_WITH_GENRE, {
    fetchPolicy: "no cache"
  })
  const userResult = useQuery(USER_DATA, {
    fetchPolicy: "no-cache"
  })

  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (!userResult) {

    } else if (!userResult.data) {

    } else if (userResult.data.me !== null) {
      setGenre(userResult.data.me.favoriteGenre)
      getBooks({ variables: { genre: userResult.data.me.favoriteGenre } })
    }
    // if (!userResult.data) {
    //   getUser()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userResult])

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookResult.data])

  if (!props.show || !userResult || !books || !genre) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
  in your favorite genre <b>{genre}</b>
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