const url = '/api/login'
import axios from 'axios'


const login = async (credentials) => {
  const { username, password } = credentials
  const response =  await axios.post(url,{ username, password })
  return response.data
}

export { login }