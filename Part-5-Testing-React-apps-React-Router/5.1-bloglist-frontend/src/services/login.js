let token = null
const url = "/api/login"
import axios from "axios"

const saveToken = tokenRaw =>{
    token = `Bearer ${tokenRaw}`
}

const auth = () =>{
    return {
        "authentication":token
    }
}


const login = (credentials)=>{
    const {username, password} = credentials
    return axios.post(url,{username, password})
    .then(response=>response.data)
    .then((data)=>{
        saveToken(data.token)
        return data
    })
    .catch(()=>console.log("Login failed"))
}

export {login}