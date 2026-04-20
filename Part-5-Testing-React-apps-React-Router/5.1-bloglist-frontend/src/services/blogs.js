import axios from 'axios'
const url = '/api/blogs'

let token = null
const setToken = tokenRaw =>{
    token = tokenRaw
}


const createBlog = async(blog)=>{
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(url, blog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}



export { getAll, setToken, createBlog }