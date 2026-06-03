import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import {setToken} from './services/blogs'
import LoginForm from './components/LoginForm'
import { login } from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { notificationActions } from './store/notification'
import Togglable from './components/Togglable'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
} from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
import BlogList from './components/BlogList'
import { blogActions } from './store/blogs'

const localStorage = window.localStorage

const App = () => {
  const [user, setUser] = useState(null)
  const navigateTo = useNavigate()


  useEffect(() => {
    const loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
    }
    blogActions.getAll()

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


  const handleLogout = () => {
    notificationActions.success(`"${user.name}" has logged off`)
    setUser(null)
    setToken(null)
    localStorage.removeItem('loginUser')
    navigateTo('/')
  }

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
                  <Blog
                    user={user}
                  />
              }
            />
            <Route
              path="/"
              element={<BlogList />}
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
                    <BlogForm />
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
