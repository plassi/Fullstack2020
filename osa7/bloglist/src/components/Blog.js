import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = (props) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : 'contents' }
  const showWhenVisible = { display: visible ? 'contents' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeButton = () => {

    if (props.blog.user) {
      if (props.user.id === props.blog.user.id) {
        return (
          <button id='remove-blog-button' onClick={props.removeButtonClickHandler} style={{ backgroundColor: 'blue' }}>remove</button>
        )
      }
    }

    return (<></>)


  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog-listing'>
      {props.blog.title} {props.blog.author}
      <div style={hideWhenVisible}>
        <button id='show-blog-button' onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} className='blog-info'>
        <button onClick={toggleVisibility}>hide</button>
        <div>{props.blog.url}</div>
        <div>likes {props.blog.likes} <button id='like-blog-button' onClick={props.likeButtonClickHandler}>like</button></div>
        {props.blog.user ? props.blog.user.name : null}
        {removeButton()}
      </div>
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
