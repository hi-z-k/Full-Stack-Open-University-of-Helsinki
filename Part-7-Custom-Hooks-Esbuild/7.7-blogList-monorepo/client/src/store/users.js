import { create } from 'zustand'
import userService from '../services/users'



const useUsersStore = create(() => ({
    user: [],
}))

const setUsers = (user) => {
    useUsersStore.setState({
        user
    })
}

const getAllUsers = async () => {
    const loggedUser = await userService.getAll()
    setUsers(loggedUser)    
}


export const usersActions = {
    getAllUsers
}

export const useUsers = () => {
    const users = useUsersStore(state=>state.user)

    return {
        users,
        actions: usersActions
    }
}



