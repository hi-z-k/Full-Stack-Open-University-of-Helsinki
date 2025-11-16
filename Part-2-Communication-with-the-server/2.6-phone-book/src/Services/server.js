import axios from "axios"

const URL = "http://localhost:3001/persons"


const loadDataFromServer = () => {
    return axios.get(URL)
    .then(response => response.data)
    .catch(error=>[])
} 
const addDataToServer = (data) => {
    return axios.post(URL,data)
    .then(response=>response.data)
}
const DeleteFromServer = (id)=>{
    return axios.delete(`${URL}/${id}`)
    .then(response => response.data.id)
}

export default {loadDataFromServer, addDataToServer, DeleteFromServer}