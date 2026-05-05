import { useState } from 'react'
import { TextField, Stack, Button } from '@mui/material'


const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNote = (e) => {
    e.preventDefault()
    onCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return <form onSubmit={handleNote}>
    <h3>Create a new Blog</h3>
    <Stack spacing={2} sx={{ width:'40%' }}>

      <TextField
        label = "title"
        value={title}
        variant="outlined"
        onChange={({ target }) => setTitle(target.value)}
      />
      <TextField
        label = "author"
        value={author}
        variant="outlined"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <TextField
        label = "url"
        type="url"
        value={url}
        variant="outlined"
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button type="submit" variant='contained' style={{ marginTop: 30, width: '10%' }}>Create</Button>
    </Stack>
  </form>
}

export default BlogForm