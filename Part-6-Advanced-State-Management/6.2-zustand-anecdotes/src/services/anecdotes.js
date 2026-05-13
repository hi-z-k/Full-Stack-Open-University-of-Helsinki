import { getNotificationActions } from "../notificationStore"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const { setSuccessNotification, setErrorNotification } = getNotificationActions()
    
    try {
        const response = await fetch(baseUrl)
        if (!response.ok) throw new Error('Failed to fetch anecdotes')
        
        const data = await response.json()
        setSuccessNotification('Fetched anecdotes successfully')
        return data
    } catch (e) {
        setErrorNotification(e.message)
        return []
    }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteBuilder = anecdote => ({
    content: anecdote,
    id: getId(),
    votes: 0
})

const createAnecdote = async (anecdote) => {
    const { setSuccessNotification, setErrorNotification } = getNotificationActions()
    const newAnecdote = anecdoteBuilder(anecdote)
    
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAnecdote)
        })
        if (!response.ok) throw new Error('Failed to add anecdote')
        
        setSuccessNotification(`Added anecdote: "${newAnecdote.content}" successfully`)
        return await response.json()
    } catch (e) {
        setErrorNotification(e.message)
    }
}

const updateAnecdote = async (id, anecdote) => {
    const { setSuccessNotification, setErrorNotification } = getNotificationActions()
    
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(anecdote)
        })
        if (!response.ok) throw new Error('Failed to update anecdote')
        setSuccessNotification(`You voted for “${anecdote.content.slice(0,20)}...”`)
        return await response.json()
    } catch (e) {
        setErrorNotification(e.message)
    }
}

const deleteAnecdote = async (id) => {
    const { setSuccessNotification, setErrorNotification } = getNotificationActions()
    
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) throw new Error('Failed to delete anecdote')
        setSuccessNotification(`Deleted anecdote successfully`)
        return await response.json()
    } catch (e) {
        setErrorNotification(e.message)
    }
}

export default { getAll, createAnecdote, updateAnecdote, deleteAnecdote}