import { TextField, Stack, Button } from '@mui/material'
import { blogActions } from '../store/blogs'
import { notificationActions } from '../store/notification'
import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'

const BlogForm = () => {
  const title = useField()
  const author = useField()
  const url = useField()
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
    handleCreateBlog({ title: title.props.value, author: author.props.value, url: url.props.value })
  }
  return (
    <form onSubmit={handleNote}>
      <h3>Create a new Blog</h3>
      <Stack spacing={2} sx={{ width: '40%' }}>
        <TextField
          label="title"
          {...title.props}
        />
        <TextField
          label="author"
         {...author.props}
        />
        <TextField
          label="url"
          {...url.props}
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
