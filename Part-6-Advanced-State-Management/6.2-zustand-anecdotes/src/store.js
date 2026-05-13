import { create } from 'zustand'
import anecdoteService from './services/anecdotes.js'


const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes.toSorted((a, b) => b.votes - a.votes) }))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updatedAnecdote = await anecdoteService.updateAnecdote(id, { ...anecdote, votes: anecdote.votes + 1 })
      return set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updatedAnecdote : anecdote
        ).toSorted((a, b) => b.votes - a.votes)
      }))
    },
    add: async (anecdote) => {
      const newAnecdote = await anecdoteService.createAnecdote(anecdote)
      return set(
        state => ({ anecdotes: state.anecdotes.concat(newAnecdote).toSorted((a, b) => b.votes - a.votes) })
      )
    },
    setFilter: query => set(() => ({ filter: query }))
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
