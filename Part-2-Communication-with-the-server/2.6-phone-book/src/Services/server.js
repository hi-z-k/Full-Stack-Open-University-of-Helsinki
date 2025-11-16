import axios from "axios"

const URL = "http://localhost:3001/persons"

const getLink = id => `${URL}/${id}`

const loadData = () => {
    return axios.get(URL)
    .then(response => response.data)
    .catch(error=>[])
} 
const addData = (data) => {
    return axios.post(URL,data)
    .then(response=>response.data)
}
const deleteData = (id)=>{
    return axios.delete(getLink(id))
    .then(response => response.data.id)
}
const replaceData = (id,data)=>{
    return axios.put(getLink(id),data)
    .then(response => response.data)
}

export default {loadData, addData, deleteData, replaceData}