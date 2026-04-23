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

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}


const addLike = async (blog)=>{
  const {id, likes} = blog
  const idUrl = `${url}/${id}`
  const response = await axios.put(idUrl, {likes: likes+1})
  return response.data
}

const removeLike = async (blog)=>{
  const {id, likes} = blog
  const idUrl = `${url}/${id}`
  const response = await axios.put(idUrl, {likes: likes-1})
  return response.data
}

const deleteBlog = async(id)=>{
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.delete(url+`/${id}`, config)
  return response.data
}

export { getAll, setToken, createBlog, addLike, removeLike, deleteBlog }