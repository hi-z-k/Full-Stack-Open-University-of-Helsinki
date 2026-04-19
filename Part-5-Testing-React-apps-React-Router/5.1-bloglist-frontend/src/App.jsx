import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll, setToken, createNote } from './services/blogs'
import LoginForm from './components/LoginForm'
import { login } from './services/login'
import NoteForm from './components/NoteForm'
const localStorage = window.localStorage

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
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
    }
    catch(e){
      console.error(e.user)
    }
  }

    const handleCreateNote = async(newNote)=>{
    try{
      const note = await createNote(newNote)
      setBlogs(blogs.concat(note))
    }
    catch(e){
      console.error(e.message)
    }
  }

  const handleLogout = ()=>{
    setUser(null)
    setToken(null)
    localStorage.removeItem('loginUser')
  }
  return (
    <div>
      <h2>blogs</h2>
      {user ? <>
        <h4>
          {user.name} is logged in
          <button onClick={handleLogout}>
            Logout
          </button>
        </h4>
          <NoteForm onCreate={handleCreateNote} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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