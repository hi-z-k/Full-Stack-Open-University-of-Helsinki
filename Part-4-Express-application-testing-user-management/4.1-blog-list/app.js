import express from 'express'
import mongoose from 'mongoose'
import {MONGO_URL} from './utils/config.js'
import blogRouter from './controllers/blog.js'
import userRouter from './controllers/user.js'
import { unknownEndpoint, errorHandler, tokenFetcher } from './utils/middleware.js'
import loginRouter from './controllers/login.js'

const app = express()

mongoose.connect(MONGO_URL, { family: 4 })
app.use(express.json())
app.use(tokenFetcher)

app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app

