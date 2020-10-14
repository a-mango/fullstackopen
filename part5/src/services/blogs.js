import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

const setToken = newToken => (token = `bearer ${newToken}`)

export default { getAll, setToken }
