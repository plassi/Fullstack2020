import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'
import {
  Link
} from "react-router-dom"

const BlogList = (props) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)

  const blogFormRef = React.createRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const renderBlogs = () => {
    return (
      blogs.map(blog =>
        <div key={blog.id} style={blogStyle} className='blog-listing'>

          <Link to={`blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>

      )
    )
  }

  return (
    <>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {renderBlogs()}
    </>
  )

}

export default BlogList