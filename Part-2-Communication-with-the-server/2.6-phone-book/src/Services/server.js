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

export default {loadDataFromServer, addDataToServer}