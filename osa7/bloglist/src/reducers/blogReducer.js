import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      const blogToComment = action.data
      const changedState = state.map(blog =>
        blog.id === blogToComment.id ? blogToComment : blog
      )
      return changedState
    case 'LIKE_BLOG':
      const blogToChange = action.data
      const newState = state.map(blog =>
        blog.id === blogToChange.id ? blogToChange : blog
      )
      // order by likes
      return newState.sort((a, b) => b.likes - a.likes)
    case 'CREATE_BLOG':
      const newBlog = action.data
      return state.concat(newBlog)
    case 'DELETE_BLOG':
      const blogToRemove = action.data
      return state.filter(blog => blog.id !== blogToRemove.id)
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addLike(blog).then(response =>
      blogService.getBlog(response)
    )
    dispatch({
      type: 'LIKE_BLOG',
      data: newBlog
    })
  }
}

export const addComment = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addComment(blog).then(response =>
      blogService.getBlog(response)
    )
    dispatch({
      type: 'ADD_COMMENT',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const blog = await blogService.create(content).then(response =>
      blogService.getBlog(response)
    )

    dispatch({
      type: 'CREATE_BLOG',
      data: blog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default reducer