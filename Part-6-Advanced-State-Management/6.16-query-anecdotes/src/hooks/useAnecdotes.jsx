import { useQuery } from '@tanstack/react-query'
import anecdoteService from '../requests'



export const useAnecdotes = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: anecdoteService.getAnecdotes,
        retry: false
    })
    return {
        isPending, 
        isError, 
        anecdotes: data, 
        error
    }
}