import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import useBlogs, { blogActions } from '../store/blogs'
import { notificationActions } from '../store/notification'
import { useMatch, useNavigate } from 'react-router-dom'
import { useUser } from '../store/user'
import CommentForm from './CommentForm'

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

const Blog = () => {
  const { user } = useUser()
  const navigateTo = useNavigate()
  const match = useMatch('/blogs/:id')
  const [isLiked, setIsLiked] = useState(false)
  const { blogs, loading } = useBlogs()

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  if (loading) {
    return <Typography>Loading blog...</Typography>
  }

  if (!blog) {
    return <Typography>The Blog doesn't exist</Typography>
  }
  const handleLike = async () => {
    try {
      if (!isLiked) {
        await blogActions.addLike(blog)
      } else {
        await blogActions.removeLike(blog)
      }
    } catch (e) {
      notificationActions.error(`Blog Liking Failed: ${e.message}`)
    }
    setIsLiked(!isLiked)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        const deletedBlog = blogs.find((b) => b.id === blog.id)
        await blogActions.deleteBlog(blog.id)
        notificationActions.success(`"${deletedBlog.title}" by ${deletedBlog.author} deleted`)
        navigateTo('/')
      } catch (e) {
        notificationActions.error(`Blog Deletion Failed: ${e.message}`)
      }
    }
  }


  const isSameUser = user && blog.user && user.username === blog.user.username
  return (
    <Card className="blog">
      <CardTitle>{blog.title}</CardTitle>
      <CardAuthor>by {blog.author}</CardAuthor>
      <CardURL href={blog.url}>{blog.url}</CardURL>
      <CardCreator>Added by {blog.user.name}</CardCreator>
      <CardLikes>
        likes <span className="like">{blog.likes}</span>
      </CardLikes>
      {user && (
        <Button
          variant={isLiked ? 'outlined' : 'contained'}
          aria-label="like"
          onClick={handleLike}
        >
          {isLiked ? 'unlike' : 'like'}
        </Button>
      )}
      {isSameUser && (
        <Button
          variant="outlined"
          sx={{ color: '#f44336', borderColor: '#f44336' }}
          aria-label="remove"
          onClick={handleRemove}
        >
          remove
        </Button>
      )}
      <>
        <h1>Comments</h1>
        <CommentForm id={blog.id}/>
        <ul>
          {blog.comments.map(b => <li key={b.id}>{b.content}</li>)}
        </ul>
      </>
    </Card>
  )
}

export default Blog
