import { useState } from 'react'


const Blog = ({ data, onLike, onRemove }) => {
  const { user,blog } = data
  const [viewAll, setViewAll] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const handleViewAll = () => setViewAll(!viewAll)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
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
  const isSameUser = user.username === blog.user.username
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleViewAll}>{viewAll ? 'hide' : 'view'}</button>
      {viewAll && <>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={handleLike}>{isLiked ? 'unlike' : 'like'}</button>
        </div>
        <div>{blog.user.name}</div>
        {(isSameUser) &&
        <button onClick={handleRemove}>remove</button>}
      </>}
    </div>
  )
}


export default Blog