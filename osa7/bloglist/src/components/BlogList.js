import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = (props) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)

  const blogFormRef = React.createRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const likeButtonClickHandler = (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeButtonClickHandler = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }

  const renderBlogs = () => {
    return (
      blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
          likeButtonClickHandler={() => likeButtonClickHandler(blog)}
          removeButtonClickHandler={() => removeButtonClickHandler(blog)}
        />
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