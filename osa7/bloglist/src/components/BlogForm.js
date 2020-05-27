import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
  }

  return (

    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        title: <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        /><br />
        author: <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br />
        url: <input
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
        /><br />
        <button id='create-submit-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm