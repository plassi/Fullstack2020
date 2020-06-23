import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors 
      {
        name
        born
        bookCount
      }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks { 
      title 
      author {
        name
        born
      }
      published 
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
    }
  }
`

export const SET_BIRTH = gql`
  mutation editAuthorSetBornTo($name: String!, $born: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER_DATA = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOKS_WITH_GENRE = gql`
  query allbooks($genre: String) {
    allBooks(genre: $genre) { 
      title 
      author {
        name
        born
      }
      published 
      genres
    }
  }
`