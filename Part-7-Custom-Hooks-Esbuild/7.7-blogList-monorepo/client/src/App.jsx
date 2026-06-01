import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import {
  getAll,
  setToken,
  createBlog,
  addLike,
  removeLike,
  deleteBlog,
} from './services/blogs'
import LoginForm from './components/LoginForm'
import { login } from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { notificationActions } from './store/notification'
import Togglable from './components/Togglable'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
} from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'

const localStorage = window.localStorage

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const navigateTo = useNavigate()

  const setAndSortBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    getAll().then((blogs) => setAndSortBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (credential) => {
    try {
      const user = await login(credential)
      setUser(user)
      setToken(user.token)
      localStorage.setItem('loginUser', JSON.stringify(user))
      notificationActions.success(`${user.name} logged in successfully`)
      navigateTo('/')
    } catch (e) {
      notificationActions.error(`Login Failed: ${e.message}`)
    }
  }

  const handleRemove = async (id) => {
    try {
      const deletedBlog = blogs.find((b) => b.id === id)
      await deleteBlog(id)
      const newBlogs = blogs.filter((b) => b.id !== id)
      setAndSortBlogs(newBlogs)
      navigateTo('/')
      notificationActions.success(`"${deletedBlog.title}" by ${deletedBlog.author} deleted`)
    } catch (e) {
      notificationActions.error(`Blog Deletion Failed: ${e.message}`)
    }
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const blog = await createBlog(newBlog)
      notificationActions.success(
        `a new blog "${blog.title}" by ${blog.author} added`
      )
      setAndSortBlogs(blogs.concat(blog))
      navigateTo('/')
    } catch (e) {
      console.error(e.message)
      notificationActions.error(`Blog Creation Failed: ${e.message}`)
    }
  }

  const onLike = async (blog, isLiked) => {
    try {
      let updatedBlog
      if (!isLiked) {
        updatedBlog = await addLike(blog)
      } else {
        updatedBlog = await removeLike(blog)
      }
      setAndSortBlogs(
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    } catch (e) {
      notificationActions.error(`Blog Liking Failed: ${e.message}`)
    }
  }

  const handleLogout = () => {
    notificationActions.success(`"${user.name}" has logged off`)
    setUser(null)
    setToken(null)
    localStorage.removeItem('loginUser')
    navigateTo('/')
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  return (
    <Container>
      <Stack>
        <AppBar sx={{ marginBottom: '10' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/create">
                  new blog
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <h2>blogs</h2>
         <Notification />
        <ErrorBoundary>
          <Routes>
            <Route
              path="/blogs/:id"
              element={
                blog && (
                  <Blog
                    key={blog.id}
                    data={{ blog, user }}
                    onLike={onLike}
                    onRemove={handleRemove}
                  />
                )
              }
            />
            <Route
              path="/"
              element={blogs.map((blog) => (
                <ul>
                  <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </li>
                </ul>
              ))}
            />
            <Route
              path="/login"
              element={!user && <LoginForm onLogin={handleLogin} />}
            />
            <Route
              path="/create"
              element={
                user && (
                  <Togglable buttonLabel={'create new blog'}>
                    <BlogForm onCreate={handleCreateBlog} />
                  </Togglable>
                )
              }
            />
            <Route path="*" element={<h1>404 - Page not found</h1>} />
          </Routes>
        </ErrorBoundary>
      </Stack>
    </Container>
  )
}

export default App
