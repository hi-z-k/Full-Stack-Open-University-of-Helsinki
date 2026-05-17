import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../requests'



export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: anecdoteService.getAnecdotes,
        retry: false
    })
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.createAnecdote,
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes ? anecdotes.concat(anecdote): [anecdote])
        }
    })
    const updateAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.updateAnecdote,
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const updatedAnecdotes = anecdotes.map(a=> anecdote.id === a.id ? anecdote: a)
            queryClient.setQueryData(['anecdotes'], anecdotes ? updatedAnecdotes: anecdotes)
        }
    })
    return {
        isPending, 
        isError, 
        anecdotes: data, 
        addAnecdote: (content) => newAnecdoteMutation.mutate({content, votes: 0}),
        updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1}),
        error
    }
}