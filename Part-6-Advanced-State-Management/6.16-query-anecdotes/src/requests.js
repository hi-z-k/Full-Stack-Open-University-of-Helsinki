const baseUrl = 'http://localhost:3001/anecdotes'


const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    return await response.json()
}

const createAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create note')
    }

    return await response.json()
}


export default { getAnecdotes, createAnecdote }