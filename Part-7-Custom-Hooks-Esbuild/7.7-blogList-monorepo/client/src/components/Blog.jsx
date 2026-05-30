import { Button } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'

const Card = styled.div`
    border: 2px solid;
    border-style: ridge;
    border-radius: 0.5em;
    padding: 0rem 0rem 2rem 1.5em;

  `
const CardTitle = styled.p`
  font-size: 2em;
  `
const CardAuthor = styled.p`
  font-size: 1.4em;
  color: rgb(108, 108, 108);
  `
const CardURL = styled.a`
  display: block;
  margin: 0.5rem 0;
  color: #1976d2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const CardLikes = styled.span`
  padding: 0.6rem 1.2rem 0 0;
  `
const CardCreator = styled.div`
  padding: 0.6rem;
  color: rgb(28, 87, 0);
  padding-left: 0rem;
  `

const Blog = ({ data, onLike, onRemove }) => {
  const { user,blog } = data
  const [isLiked, setIsLiked] = useState(false)
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
    <Card className="blog">
      <CardTitle>{blog.title}</CardTitle>
      <CardAuthor>by {blog.author}</CardAuthor>
      <CardURL href={blog.url}>{blog.url}</CardURL>
      <CardCreator>Added by {blog.user.name}</CardCreator>
      <CardLikes>likes <span className='like'>{blog.likes}</span></CardLikes>
      {user && <Button variant={isLiked ? 'outlined' : 'contained'} aria-label='like' onClick={handleLike}>{isLiked ? 'unlike' : 'like'}</Button>}
      {(isSameUser) &&
      <Button variant='outlined'   sx={{ color: '#f44336', borderColor: '#f44336' }} aria-label='remove' onClick={handleRemove}>remove</Button>}
    </Card>
  )
}


export default Blog