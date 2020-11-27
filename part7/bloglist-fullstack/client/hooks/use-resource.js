import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])
  const [headers, setHeaders] = useState(null)

  useEffect(() => {
    axios.get(baseUrl, headers).then(response => {
      setResources(response.data)
    })
  }, [baseUrl, headers])

  const setToken = token => {
    setHeaders({ Authorization: `bearer ${token}` })
  }

  const create = async resource => {
    const response = await axios.post(baseUrl, resource, headers)
    setResources(resources.concat(response.data))
    return response.data
  }

  const get = async id => {
    const response = await axios.get(`${baseUrl}/${id}`, headers)
    return response.data
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl, headers)
    return response.data
  }

  const remove = async id => {
    await axios.delete(`${baseUrl}/${id}`, headers)
    setResources(
      resources.filter(resource => (resource.id !== id ? resource : null))
    )
  }

  const update = async (id, resource) => {
    const response = await axios.put(`${baseUrl}/${id}`, resource, headers)
    setResources(
      resources.filter(resource =>
        resource.id !== id ? resource : response.data
      )
    )
    return response.data
  }

  const service = {
    create,
    get,
    getAll,
    remove,
    update,
  }

  return [resources, service, setToken]
}

export default useResource
