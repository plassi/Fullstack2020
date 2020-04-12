import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = (props) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

  }, [])

  const blogFormRef = React.createRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      .then(
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
      )
  }

  const sortByLikes = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }

  blogs.sort(sortByLikes)

  const likeButtonClickHandler = (blog) => {
    blogService.addLike(blog)

    const newBlogs = blogs.map(
      listedBlog => listedBlog.id === blog.id
        ? { ...blog, likes: blog.likes + 1 }
        : listedBlog)

    setBlogs(newBlogs)
  }

  const removeButtonClickHandler = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

      blogService.deleteBlog(blog)

      const newBlogs = blogs.filter(listedBlog => listedBlog.id !== blog.id)

      setBlogs(newBlogs)
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

BlogList.propTypes = {
  user: PropTypes.object.isRequired
}

export default BlogList