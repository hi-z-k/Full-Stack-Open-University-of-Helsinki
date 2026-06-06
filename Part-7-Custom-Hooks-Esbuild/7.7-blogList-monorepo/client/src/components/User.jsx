import { Button, Typography } from '@mui/material'
import { useMatch } from 'react-router-dom'
import { useUsers } from '../store/users'



const User = () => {
  const match = useMatch('/users/:id')
  const { users } = useUsers()

  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return <Typography>The user doesn't exist</Typography>
  }


  return (
    <>
    <h1>{user.name}</h1>
    <Typography>added blogs</Typography>
    <ul>
    {user.blogs.map(blog=><li>{blog.title}</li>)}
    </ul>
    </>
  )
}

export default User
