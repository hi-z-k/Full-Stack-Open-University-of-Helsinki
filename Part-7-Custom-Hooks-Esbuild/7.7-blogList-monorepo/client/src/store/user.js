import { create } from 'zustand'
import { setToken } from '../services/blogs'
import * as loginSerivce from '../services/login'
import userStorage from '../services/persistentUser'



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
    const loggedUser = userStorage.getUser()
    if (loggedUser) {
        setUser(loggedUser)
        setToken(loggedUser.token)
    }
}

const login = async (credential) => {
    const user = await loginSerivce.login(credential)
    setUser(user)
    setToken(user.token)
    userStorage.setUser(user)
    return user
}


const logout = () => {
    clearUser()
    setToken(null)
    userStorage.clearUser()
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



