import  '../index.css'
import { Alert } from '@mui/material'

const Notification = ({ data }) => {
  const { message,type } = data
  if (!message) {
    return null
  }
  return <Alert severity={type}>{message}</Alert>
}

export default Notification
