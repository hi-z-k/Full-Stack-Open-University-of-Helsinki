import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../requests'
import { useNotify } from './useNotify'



export const useAnecdotes = () => {
    const {notify} = useNotify()
    const queryClient = useQueryClient()
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: anecdoteService.getAnecdotes,
        retry: false
    })
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.createAnecdote,
        onSuccess: (anecdote) => {
            notify(`A new anecdote created: ${anecdote.content}`);
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes ? anecdotes.concat(anecdote): [anecdote])
        },
        onError: (error)=>{
            notify(`Error: ${error.message}`);
        }
    })
    const updateAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.updateAnecdote,
        onSuccess: (anecdote) => {
            notify(`You voted for anecdote: ${anecdote.content}`);
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const updatedAnecdotes = anecdotes.map(a=> anecdote.id === a.id ? anecdote: a)
            queryClient.setQueryData(['anecdotes'], anecdotes ? updatedAnecdotes: anecdotes)
        },
        onError: (error)=>{
            notify(`Error: ${error.message}`);
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