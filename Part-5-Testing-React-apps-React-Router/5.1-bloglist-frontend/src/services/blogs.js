import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = tokenRaw =>{
    token = tokenRaw
}

const auth = () =>{
    return {
        "authentication":`Bearer ${token}`
    }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



export default { getAll, setToken }