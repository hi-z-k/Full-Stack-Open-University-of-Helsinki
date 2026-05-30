import { TextField, Stack, Button } from '@mui/material'
import { useState } from 'react'


const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  return <form  onSubmit={e => handleLogin(e)}>
    <Stack spacing={2} sx={{ width:'40%' }}>
      <TextField
        label = "username"
        value={username}
        variant="standard"
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        label = "password"
        value={password}
        variant="standard"
        onChange={({ target }) => setPassword(target.value)}
      />
    </Stack>
    <Button type="submit" variant='contained' style={{ marginTop: 30, width: 'auto' }}>Login</Button>
  </form>
}

export default LoginForm