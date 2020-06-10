import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  const [newComment, setNewComment] = useState('')

  const addNewComment = (event) => {
    event.preventDefault()
    const newBlog = blog
    newBlog.comments.push(newComment)
    dispatch(addComment(newBlog))
    setNewComment('')
  }

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value)
  }


  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addNewComment}>
        <input
          id='comment'
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <button id='add-comment-button' type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => {
          return (
            <li key={index}>{comment}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Comments