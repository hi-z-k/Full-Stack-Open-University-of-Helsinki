import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'


export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }
    return {
        prop: {
            type,
            value,
            onChange
        },
        reset: () => setValue('')
    }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])
    useEffect(() => {
        const getAnecdotes = async () => {
            try {
                const data = await anecdoteService.getAll()
                setAnecdotes(data)
            } catch (error) {
                console.error('Failed to fetch anecdotes:', error)
            }
        }
        getAnecdotes()
    }, [])
    const addAnecdotes = async (anecdote) => {
            try {
                const newAnecdote = await anecdoteService.createNew({...anecdote, id: Math.round(Math.random() * 10000) })
                setAnecdotes(prev => prev.concat(newAnecdote))
            } catch (error) {
                console.error('Failed to add anecdote:', error)
            }
        }
    const deleteAnecdote = async (anecdote) => {
            try {
                await anecdoteService.deleteBy(anecdote)
                setAnecdotes(anecdotes.filter(a => a.id !== anecdote.id))
            } catch (error) {
                console.error('Failed to delete anecdote:', error)
            }
        }

    return {
        anecdotes,
        addAnecdotes,
        deleteAnecdote
    }
}