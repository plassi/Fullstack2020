import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async object => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response
}

const addLike = async blogObject => {
  const newObject = {
    ...blogObject,
    likes: blogObject.likes + 1,
    user: blogObject.user ? blogObject.user.id : null
  }
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, newObject)
  return response
}

export default { getAll, create, setToken, addLike, deleteBlog }