import { useNotification } from "../notificationStore"

const Notification = () => {
  const {content, type} = useNotification()
  if (!content) return null
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: type === 'success' ? 'green': 'red'
  }

  return <div style={style}>{content}</div>
}

export default Notification