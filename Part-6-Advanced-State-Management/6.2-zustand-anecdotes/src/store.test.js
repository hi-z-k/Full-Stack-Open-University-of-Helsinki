import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createAnecdote: vi.fn(),
        updateAnecdote: vi.fn(),
        deleteAnecdote: vi.fn()
    }
}))
import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'


beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('using the anecdotes actions', () => {
    const mockAnecdotes = [
        {
            "content": "Adding manpower to a late software project makes it later!",
            "id": "21149",
            "votes": 10
        },
        {
            "content": "If it hurts, do it more often",
            "id": "47145",
            "votes": 7
        }
    ]
    const initializeAnecdotes = async (mockAnecdotes)=>{
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result: { current: { initialize } } } = renderHook(() => useAnecdoteActions())
        await act(async () => initialize())
    }
    beforeEach(async() => {
        await initializeAnecdotes(mockAnecdotes)
    })
    it('initialize anecdotes from service', async () => {
        const { result: { current: anecdotes } } = renderHook(() => useAnecdotes())
        expect(anecdotes).toEqual(mockAnecdotes)
    })
    it('the anecdotes are sorted by votes descendingly',async()=>{
        await initializeAnecdotes(mockAnecdotes.toReversed())
        const { result: { current: anecdotes } } = renderHook(() => useAnecdotes())
        let isDescending = true
        let prev = anecdotes[0]
        for (let i = 1; i < anecdotes.length; i++) {
            const curr = anecdotes[i];
            if (prev.votes < curr.votes){
                isDescending = false
                break
            }
            prev = curr
        }
        expect(isDescending).toBe(true)
    })
})