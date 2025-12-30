import axios from "axios"

const URL = "/api/persons"

const getLink = id => `${URL}/${id}`

const handleError = (e)=>{
    const message = e.response.data.message || "Something went wrong";
    throw new Error(message)
}


const loadData = () => {
    return axios.get(URL)
    .then(response => response.data)
    .catch(handleError)
} 
const addData = (data) => {
    return axios.post(URL,data)
    .then(response=>response.data)
    .catch(handleError)
}
const deleteData = (id)=>{
    return axios.delete(getLink(id))
    .then(() => id)
    .catch(handleError)
}
const replaceData = (id,data)=>{
    return axios.put(getLink(id),data)
    .then(response => response.data)
    .catch(handleError)
}

export default {loadData, addData, deleteData, replaceData}