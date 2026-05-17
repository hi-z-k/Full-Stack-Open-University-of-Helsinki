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
    return {
        isPending, 
        isError, 
        anecdotes: data, 
        addAnecdote: (content) => newAnecdoteMutation.mutate({content, votes: 0}),
        error
    }
}