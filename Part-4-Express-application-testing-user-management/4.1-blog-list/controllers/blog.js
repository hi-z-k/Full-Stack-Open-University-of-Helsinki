import { Router } from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
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

blogRouter.post('/', async (request, response, next) => {
  try{
    const {author, title, url, likes, user} = request.body
    const userDB = await User.findById(user)
    if (!userDB) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }
    if (!title || !url){
      return response.status(400).json({error: "bad request"})
    }
    const blog = new Blog({title,url,author,likes,user})
    const blogResponse = await blog.save()
    response.status(201).json(blogResponse)
  }
  catch(e){
    next(e)
  }
})
blogRouter.delete('/:id', async (request, response, next)=>{
  try{
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  catch(e){
    next(e)
  }
})
blogRouter.put('/:id', async (request, response, next)=>{
  const {title, author, url, likes} = request.body
  const blog = {title, author, url, likes}
  try{
    const id = request.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )
    if (!updatedBlog){
      return response.status(404).end()
    }
    response.status(200).json(updatedBlog)
  }
  catch(e){
    next(e)
  }
})

export default blogRouter