import { useState } from 'react'


const Blog = ({ data, onLike, onRemove }) => {
  const { user,blog } = data
  const [isLiked, setIsLiked] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = () => {
    onLike(blog, isLiked)
    setIsLiked(!isLiked)
  }
  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      onRemove(blog.id)
    }
  }
  const isSameUser = user && user.username === blog.user.username
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <div><a href=''>{blog.url}</a></div>
      <div>likes <span className='.like'>{blog.likes}</span>
        {user && <button aria-label='like' onClick={handleLike}>{isLiked ? 'unlike' : 'like'}</button>}
      </div>
      <div>{blog.user.name}</div>
      {(isSameUser) &&
        <button onClick={handleRemove}>remove</button>}
    </div>
  )
}


export default Blog