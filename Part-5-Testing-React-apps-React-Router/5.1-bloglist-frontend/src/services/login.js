const url = "/api/login"
import axios from "axios"


const login = (credentials)=>{
    const {username, password} = credentials
    return axios.post(url,{username, password})
    .then(response=>response.data)
    .catch(()=>console.log("Login failed"))
}

export {login}