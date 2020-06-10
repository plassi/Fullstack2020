import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
        )}
      </ListGroup>
    </>
  )
}

export default User