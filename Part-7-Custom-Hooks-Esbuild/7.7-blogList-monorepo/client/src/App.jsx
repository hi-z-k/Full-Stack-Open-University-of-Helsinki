import { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
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
import { userActions, useUser } from './store/user'
import UsersList from './components/UsersList'
import { usersActions } from './store/users'


const App = () => {
  const navigateTo = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    userActions.fetchUser()
    usersActions.getAllUsers()
    blogActions.getAll()

  }, [])

  const handleLogin = async (credential) => {
    try {
      const user = await userActions.login(credential)
      notificationActions.success(`${user.name} logged in successfully`)
      navigateTo('/')
    } catch (e) {
      notificationActions.error(`Login Failed: ${e.message}`)
    }
  }


  const handleLogout = () => {
    notificationActions.success(`"${user.name}" has logged off`)
    userActions.logout()
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
            <Button color="inherit" component={Link} to="/users">
              users
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
                <Blog />
              }
            />
            <Route
              path="/"
              element={<BlogList />}
            />
            <Route
              path="/users"
              element={<UsersList />}
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
