import React from 'react'
import { useDispatch } from 'react-redux'
import Comments from './Comments'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return(
      <Redirect to="/" />
    )
  }

  const removeButton = () => {

    if (blog.user) {
      if (user.id === blog.user.id) {
        return (
          <Button variant="danger" id='remove-blog-button' onClick={() => dispatch(removeBlog(blog))}>remove</Button>
        )
      }
    }

    return (<></>)

  }

  const blogUser = () => {
    return (
      <div>
        added by {blog.user.name}
      </div>
    )
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>{blog.url}</div>
      <div>{blog.likes} likes <Button variant="success" id='like-blog-button' onClick={() => dispatch(likeBlog(blog))}>like</Button></div>
      {blog.user
        ? blogUser()
        : null}
      {removeButton()}
      <Comments blog={blog}/>
    </div>

  )
}

export default Blog
