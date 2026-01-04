import express from 'express'
import mongoose from 'mongoose'
import {MONGO_URL} from './utils/config.js'
import blogRouter from './controllers/blog.js'
const app = express()

mongoose.connect(MONGO_URL, { family: 4 })
app.use(express.json())
app.use('/api/blogs', blogRouter)

export default app

