const localStorage = window.localStorage
const KEY = 'loginUser'



const getUser = ()=>{
    const loggedUser = localStorage.getItem(KEY)
    return loggedUser ? JSON.parse(loggedUser): null
}

const setUser = (user)=>{
    localStorage.setItem(KEY, JSON.stringify(user))
}

const clearUser = ()=>{
    localStorage.removeItem(KEY)
}

const userStorage = {
    getUser,
    setUser,
    clearUser
}

export default userStorage