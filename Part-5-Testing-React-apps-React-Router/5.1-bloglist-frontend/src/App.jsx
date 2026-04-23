import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll, setToken, createBlog, addLike, removeLike } from './services/blogs'
import LoginForm from './components/LoginForm'
import { login } from './services/login'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
const localStorage = window.localStorage


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const setSuccessNotification = (message) => {
      setNotification({
        "message": message,
        "type": "success"
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }
  const setErrorNotification = (message) => {
      setNotification({
        "message": message,
        "type": "error"
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }
  
  const setAndSortBlogs = (blogs)=>{
    blogs.sort((a,b)=> b.likes-a.likes)
    setBlogs(blogs)
  }
  
  useEffect(() => {
    getAll().then(blogs =>
      setAndSortBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    const loggedUser = localStorage.getItem('loginUser')
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
    }
  }, [])


  const handleLogin = async(credential)=>{
    try{
      const user = await login(credential)
      setUser(user)
      setToken(user.token)
      localStorage.setItem('loginUser', JSON.stringify(user))
      setSuccessNotification(`${user.name} logged in successfully`)
    }
    catch(e){
      setErrorNotification(`Login Failed: ${e.message}`)
    }
  }

    const handleCreateBlog = async(newBlog)=>{
    try{
      const blog = await createBlog(newBlog)
      setSuccessNotification(`a new blog "${blog.title}" by ${blog.author} added`)
      setAndSortBlogs(blogs.concat(blog))
    }
    catch(e){
      console.error(e.message)
      setErrorNotification(`Blog Creation Failed: ${e.message}`)
    }
  }

  const onLike = async(blog, isLiked)=>{
  try {  let updatedBlog; 
    if (!isLiked){
      updatedBlog = await addLike(blog)
    }
    else{
      updatedBlog = await removeLike(blog)
    }
    setAndSortBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
  }
  catch(e){
    setErrorNotification(`Blog Liking Failed: ${e.message}`) 
  }
}

  const handleLogout = ()=>{
    setSuccessNotification(`"${user.name}" has logged off`)
    setUser(null)
    setToken(null)
    localStorage.removeItem('loginUser')
  }
  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification data={notification}/>}
      {user ? <>
        <h4>
          {user.name}
          <button onClick={handleLogout}>
            Logout
          </button>
        </h4>
        <Togglable buttonLabel={"create new blog"}>
          <NoteForm onCreate={handleCreateBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onLike={onLike}/>
        )}
      </>
      :<>
        <h4>Log in to application</h4>
        {!user && <LoginForm onLogin={handleLogin}/>}
      </>}
    </div>
  )
}

export default App