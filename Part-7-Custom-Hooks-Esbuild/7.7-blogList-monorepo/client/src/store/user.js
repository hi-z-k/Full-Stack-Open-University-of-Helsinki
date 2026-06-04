import { create } from 'zustand'
import { setToken } from '../services/blogs'
import * as loginSerivce from '../services/login'

const localStorage = window.localStorage


const useUserStore = create(() => ({
    user: null,
}))

const clearUser = () => {
    useUserStore.setState({
        user: null,
    })
}
const setUser = (user) => {
    useUserStore.setState({
        user
    })
}

const fetchUser = () => {
    const loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
        const user = JSON.parse(loggedUser)
        setUser(user)
        setToken(user.token)
    }
}

const login = async (credential) => {
    const user = await loginSerivce.login(credential)
    setUser(user)
    setToken(user.token)
    localStorage.setItem('loginUser', JSON.stringify(user))
    return user
}


const logout = () => {
    clearUser()
    setToken(null)
    localStorage.removeItem('loginUser')
}


export const userActions = {
    fetchUser,
    login,
    logout
}

export const useUser = () => {
    const user = useUserStore(state=>state.user)

    return {
        user,
        actions: userActions
    }
}



