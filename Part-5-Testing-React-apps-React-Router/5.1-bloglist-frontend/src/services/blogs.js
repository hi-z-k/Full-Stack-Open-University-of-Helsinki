import axios from 'axios'
const url = '/api/blogs'

let token = null
const setToken = tokenRaw =>{
    token = tokenRaw
}


const createNote = async(note)=>{
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(url, note, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}



export { getAll, setToken, createNote }