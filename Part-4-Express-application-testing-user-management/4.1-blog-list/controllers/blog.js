import { Router } from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import { userFetcher } from '../utils/middleware.js'
const blogRouter = Router()


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
    .find({})
    .populate("user", {name: 1, username: 1})
    response.json(blogs)
  }
  catch(e){
    next(e)
  }
})

blogRouter.post('/', userFetcher, async (request, response, next) => {
  const user = request.user
  try{
    const {author, title, url, likes} = request.body
    if (!title || !url){
      return response.status(400).json({error: "bad request"})
    }
    const blog = new Blog({
      title,
      url,
      author,
      likes,
      user: user._id
    })
    const blogResponse = await blog.save()
    user.blogs = user.blogs.concat(blogResponse._id)
    await user.save()
    response.status(201).json(blogResponse)
  }
  catch(e){
    next(e)
  }
})
blogRouter.delete('/:id', userFetcher, async (request, response, next)=>{
  const user = request.user
  try{
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete this blog' })
    }
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  catch(e){
    next(e)
  }
})
blogRouter.put('/update/:id', userFetcher, async (request, response, next)=>{
  const user = request.user
  const {title, author, url} = request.body
  try{
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete this blog' })
    }
    const newBlog = {title, author, url}
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      newBlog,
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { name: 1, username: 1 })

    response.status(200).json(updatedBlog)
  }
  catch(e){
    next(e)
  }
})
blogRouter.put('/:id', async (request, response, next)=>{
  const {likes} = request.body
  try{
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (likes == null || likes < 0){
      return response.status(400).json({ error: 'like is not provided' })
    }
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {likes},
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { name: 1, username: 1 })
    response.status(200).json(updatedBlog)
  }
  catch(e){
    next(e)
  }
})

export default blogRouter