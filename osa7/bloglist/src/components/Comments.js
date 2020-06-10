import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

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
      <Form onSubmit={addNewComment}>
        <Form.Group>
          <Form.Control
            id='comment'
            value={newComment}
            onChange={handleNewCommentChange}
          />
          <Button id='add-comment-button' type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {blog.comments.map((comment, index) => {
          return (
            <ListGroupItem key={index}>{comment}</ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default Comments