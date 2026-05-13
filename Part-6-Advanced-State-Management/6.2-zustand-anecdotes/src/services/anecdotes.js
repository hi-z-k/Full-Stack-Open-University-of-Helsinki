const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    return await response.json()
}

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteBuilder = anecdote => ({
    content: anecdote,
    id: getId(),
    votes: 0
})
const createAnecdote = async (anecdote) => {
    const newAnecdote = anecdoteBuilder(anecdote)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }
    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        throw new Error('Failed to create anecdotes')
    }
    return await response.json()
}

export default { getAll, createAnecdote }