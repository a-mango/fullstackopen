import blogService from 'Utilities/services/blogs'
const INIT_BLOGS = 'INIT_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'

const reducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data
    case ADD_BLOG:
      return [...state, action.data]
    case UPDATE_BLOG:
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )
    case DELETE_BLOG:
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    })
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(content)
    const newBlog = {
      ...returnedBlog,
      user: {
        username: user.username,
      },
    }
    dispatch({
      type: ADD_BLOG,
      data: newBlog,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: DELETE_BLOG,
      data: {
        id,
      },
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const blogToUpdate = {
      ...blog,
    }
    const updatedBlog = await blogService.update(blog.id, blogToUpdate)
    dispatch({
      type: UPDATE_BLOG,
      data: updatedBlog,
    })
  }
}

export default reducer
