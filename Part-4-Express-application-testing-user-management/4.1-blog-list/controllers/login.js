import { Router } from 'express'
import User from '../models/user.js'
import { compare } from 'bcrypt'
import { SECRET } from '../utils/config.js'
import jwt from 'jsonwebtoken'
const { sign } = jwt



const loginRouter = Router()

loginRouter.post("/", async (request, response, next)=>{
    try { 
        const { username, password } = request.body
        const user = await User.findOne({ username })
        const {passwordHash, id, name} = user.toJSON()
        console.log(password, passwordHash)
        const isCorrectPassword = 
            user === null 
                ? false 
                : await compare(password,passwordHash)
        if (!(user && isCorrectPassword)){
            return response.status(401).json({
                error: 'invalid username or password',
                isCorrectPassword,
                user: user !== null
            })
        }
        const token = sign({username, id}, SECRET)

        response.status(200).send({
            token, 
            username, 
            name
        })
    }
    catch (e){
        next(e)
    }
})

export default loginRouter