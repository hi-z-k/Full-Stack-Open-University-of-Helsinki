import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = (credential)=>{
    login(credential)
    .then(user=>setUser(user))
    .catch(e=>console.log(e.user))
  }

  return (
    <div>
      <h2>blogs</h2>
      {user ? <>
        <h4>{user.name} is logged in</h4>
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