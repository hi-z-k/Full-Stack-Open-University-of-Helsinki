import { create } from 'zustand'

const useNotificationStore = create((set, get) => {
  const setNotification = (content, type) => {
    const existingTimeout = get().timeoutId
    if (existingTimeout) {
      clearTimeout(existingTimeout)
    }
    const newTimeoutId = setTimeout(() => {
      set({ content: '', type: '', timeoutId: null })
    }, 5000)
    set({ content, type, timeoutId: newTimeoutId })
  }

  return {
    content: '',
    type: '',
    timeoutId: null,
    actions: {
      setSuccessNotification: (content) => setNotification(content, 'success'),
      setErrorNotification: (content) => setNotification(content, 'error'),
      reset: () => {
        const existingTimeout = get().timeoutId
        if (existingTimeout) clearTimeout(existingTimeout)
        set({ content: '', type: '', timeoutId: null })
      }
    }
  }
})

export const useNotification = () => {
  const content = useNotificationStore((state) => state.content)
  const type = useNotificationStore((state) => state.type)
  return { content, type }
}

export const useNotificationActions = () => 
  useNotificationStore((state) => state.actions)

export const getNotificationActions = () => useNotificationStore.getState().actions