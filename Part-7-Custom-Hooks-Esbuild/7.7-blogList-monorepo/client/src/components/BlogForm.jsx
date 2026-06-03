import { useState } from 'react'
import { TextField, Stack, Button } from '@mui/material'
import { blogActions } from '../store/blogs'
import { notificationActions } from '../store/notification'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigateTo = useNavigate()

  const handleCreateBlog = async (newBlog) => {
    try {
      await blogActions.createBlog(newBlog)
      notificationActions.success(
        `a new blog "${newBlog.title}" by ${newBlog.author} added`
      )
      navigateTo('/')
    } catch (e) {
      console.error(e.message)
      notificationActions.error(`Blog Creation Failed: ${e.message}`)
    }
  }
  const handleNote = (e) => {
    e.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleNote}>
      <h3>Create a new Blog</h3>
      <Stack spacing={2} sx={{ width: '40%' }}>
        <TextField
          label="title"
          value={title}
          variant="outlined"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="author"
          value={author}
          variant="outlined"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="url"
          type="url"
          value={url}
          variant="outlined"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        style={{ marginTop: 30, width: 'auto' }}
      >
        Create
      </Button>
    </form>
  )
}

export default BlogForm
