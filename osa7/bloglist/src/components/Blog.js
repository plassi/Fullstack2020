import React from 'react'
import { useDispatch } from 'react-redux'
import Comments from './Comments'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'

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
          <button id='remove-blog-button' style={{ backgroundColor: 'blue' }} onClick={() => dispatch(removeBlog(blog))}>remove</button>
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
      <div>{blog.likes} likes <button id='like-blog-button' onClick={() => dispatch(likeBlog(blog))}>like</button></div>
      {blog.user
        ? blogUser()
        : null}
      {removeButton()}
      <Comments blog={blog}/>
    </div>

  )
}

export default Blog
