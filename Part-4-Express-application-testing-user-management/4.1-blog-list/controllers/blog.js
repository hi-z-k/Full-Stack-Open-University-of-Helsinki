import { Router } from 'express'
import Blog from '../models/blog.js'
import { panic } from '../utils/logger.js'
const blogRouter = Router()


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }
  catch(e){
    next(e)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try{
    const {author, title, url, likes} = request.body
    if (!title || !url){
      return response.status(400).json({error: "bad request"})
    }
    const blog = new Blog({title,url,author,likes})
    const blogResponse = await blog.save()
    response.status(201).json(blogResponse)
  }
  catch(e){
    next(e)
  }
})

export default blogRouter