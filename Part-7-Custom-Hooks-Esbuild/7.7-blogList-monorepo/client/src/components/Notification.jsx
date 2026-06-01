import '../index.css'
import { Alert } from '@mui/material'
import { useNotification } from '../store/notification'
const Notification = () => {
  const { notification } = useNotification()
  const { message, type } = notification
  if (!message) {
    return null
  }
  return <Alert severity={type}>{message}</Alert>
}

export default Notification
