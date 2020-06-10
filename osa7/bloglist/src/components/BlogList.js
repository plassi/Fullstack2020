import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'
import {
  Link
} from "react-router-dom"
import { Table } from 'react-bootstrap'

const BlogList = (props) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)

  const blogFormRef = React.createRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }


  const renderBlogs = () => {
    return (
      <Table striped>
        <tbody>
          {blogs.map(blog =>

            <tr key={blog.id}>
              <td>
                <Link to={`blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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