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
    it('initialize anecdotes from service', async () => {
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
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result: {current: { initialize }} } = renderHook(()=>useAnecdoteActions())

        await act(async () => initialize())

        const { result: { current: anecdotes } } = renderHook(()=>useAnecdotes())
        expect(anecdotes).toEqual(mockAnecdotes)
    })
})