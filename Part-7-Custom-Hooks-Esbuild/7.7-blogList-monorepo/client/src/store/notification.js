import { create } from 'zustand'

const intialNotification = {
    message: '',
    type: ''
}

const useNotificationStore = create(() => (intialNotification))

const resetNotification = () => {
    useNotificationStore.setState(intialNotification)
}


const setSuccessNotification = (message) => {
    useNotificationStore.setState({
        message: message,
        type: 'success',
    })
    setTimeout(() => {
        resetNotification()
    }, 5000)
}
const setErrorNotification = (message) => {
    useNotificationStore.setState({
        message: message,
        type: 'error',
    })
    setTimeout(() => {
        resetNotification()
    }, 5000)
}

export const notificationActions = {
  success: setSuccessNotification,
  error: setErrorNotification
}

export const useNotification = () => {
  const notification = useNotificationStore()
  
  return {
    notification,
    actions: notificationActions
  }
}



