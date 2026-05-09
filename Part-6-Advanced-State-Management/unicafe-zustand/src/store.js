import { create } from "zustand";

const statFactory = (value = 0) => create(set => ({
    value,
    actions: {            
        increment: () => set(state => ({ value: state.value + 1 })),
        decrement: () => set(state => ({ value: state.value - 1 })),
        zero: () => set(() => ({ value: 0 }))
    }
}))

const goodStore = statFactory()
const neutralStore = statFactory()
const badStore = statFactory()

const useStat = (hook)=>{
    const value = hook(state=>state.value)
    const actions = hook(state=>state.actions)
    return {
        value,
        ...actions
    }
}

export const useGood = () => useStat(goodStore)
export const useNeutral = () => useStat(neutralStore)
export const useBad = () => useStat(badStore)