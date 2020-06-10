import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({

      title: newTitle,
      author: newAuthor,
      url: newUrl

    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(initializeUsers())
  }

  return (

    <div>
      <h2>Create new</h2>

      <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          name="url"
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
        />
      </Form.Group>
        
        <Button variant="primary" id='create-submit-button' type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm