import { useState } from "react"

const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = useState(false)
  const handleViewAll = ()=>setViewAll(!viewAll)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleViewAll}>{viewAll?"view":"hide"}</button>
      {viewAll && <>
      <div>{blog.url}</div>
      <div>likes {blog.likes}</div>
      <div>{blog.user.name}</div>
      </>}
      
    </div>
  )
}


export default Blog