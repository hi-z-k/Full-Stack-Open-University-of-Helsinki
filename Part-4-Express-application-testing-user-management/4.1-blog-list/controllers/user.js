import { Router } from 'express'
import User from '../models/user.js'
import { hash } from 'bcrypt'
import { SALT_ROUND } from '../utils/config.js'

const userRouter = Router()


userRouter.get("/", async(request, response, next)=>{
        try { 
        const users = await User.find({})
        response.status(200).json(users)
    }
    catch (e){
        next(e)
    }
})

userRouter.post("/", async (request, response, next)=>{
    try { 
        const { username, name, password } = request.body
        const passwordHash = await hash(password, SALT_ROUND)
        const newUser = new User({
            username,
            name,
            passwordHash
        })
        const userData = await newUser.save()
        response.status(201).json(userData)
    }
    catch (e){
        next(e)
    }
})

export default userRouter