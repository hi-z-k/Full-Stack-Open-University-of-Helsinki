import { create } from 'zustand'
import anecdoteService from './services/anecdotes.js'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async ()=>{
      const anecdotes = await anecdoteService.getAll()
      set(()=>({ anecdotes: anecdotes.toSorted((a, b) => b.votes - a.votes) }))
    },
    vote: id => set(state => ({
      anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      ).toSorted((a, b) => b.votes - a.votes)
    })
    ),
    add: async (anecdote) => {
      const newAnecdote = await anecdoteService.createAnecdote(anecdote)
      return set(
        state => ({ anecdotes: state.anecdotes.concat(newAnecdote).toSorted((a, b) => b.votes - a.votes) })
  )},
  setFilter: query => set(()=>({filter:query}))
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(anecdote=> anecdote.content.includes(filter))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
