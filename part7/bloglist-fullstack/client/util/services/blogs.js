import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async (id, message) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { message })
  return response.data
}

const setToken = newToken => (token = `bearer ${newToken}`)

export default { getAll, create, update, remove, createComment, setToken }
