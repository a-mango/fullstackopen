import blogService from 'Utilities/services/blogs'
import { setNotification } from 'Utilities/reducers/notificationReducer'

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
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: INIT_BLOGS,
        data: blogs,
      })
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while fetching the data',
        })
      )
    }
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    try {
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
      dispatch(
        setNotification({
          type: 'success',
          message: `The blog "${newBlog.title}" was saved`,
        })
      )
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while saving the blog',
        })
      )
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: DELETE_BLOG,
        data: {
          id: blog.id,
        },
      })
      dispatch(
        setNotification({
          type: 'success',
          message: `The blog "${blog.title}" was deleted`,
        })
      )
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while deleting the blog',
        })
      )
    }
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    try {
      const blogToUpdate = {
        ...blog,
      }
      const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      dispatch({
        type: UPDATE_BLOG,
        data: updatedBlog,
      })
      dispatch(
        setNotification({
          type: 'success',
          message: `The blog "${blog.title}" was updated`,
        })
      )
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while updating the blog',
        })
      )
    }
  }
}

export const createComment = (blog, message) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.createComment(blog.id, message)
      dispatch({
        type: UPDATE_BLOG,
        data: updatedBlog,
      })
      dispatch(
        setNotification({
          type: 'success',
          message: `The comment "${message}" was added`,
        })
      )
    } catch {
      dispatch(
        setNotification({
          type: 'error',
          message: 'There was an error while adding the comment',
        })
      )
    }
  }
}

export default reducer
