import axios from 'axios'
const baseUlr = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUlr)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUlr, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUlr}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id, newObject) => {
  const request = axios.delete(`${baseUlr}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }