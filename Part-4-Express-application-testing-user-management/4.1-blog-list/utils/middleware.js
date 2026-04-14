import User from "../models/user.js"
import { SECRET } from "./config.js"
import { info, panic } from "./logger.js"
import jwt from 'jsonwebtoken'
const { verify } = jwt
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenFetcher = (request, response, next) => {
  request.token = null
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.replace('Bearer ', '')
    request.token = token
  }
  next()
}

const userFetcher = async (request, response, next) => {
  const { token } = request
  request.user = null
  if (request.method === 'GET') {
    return next()
  }
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  try {
    const { id } = verify(token, SECRET)
    if (!id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(id)
    if (!user){
      return response.status(401).json({ error: 'user not found' })
    }
    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}


const errorHandler = (error, request, response, next) => {
  panic(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

export {
  unknownEndpoint,
  errorHandler,
  tokenFetcher,
  userFetcher
}
