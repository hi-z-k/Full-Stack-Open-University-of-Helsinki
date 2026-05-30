import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import User from '../models/user.js'
import app from '../app.js'
import users, { userWithShortPassword, userWithShortUsername } from './users.js'

// TODO write testing for /users
// TODO invalid users => {username < 3, password < 3}

const api = supertest(app)
describe.only('verify user request for login',()=>{
    beforeEach(async ()=>{
        await User.deleteMany({})
        for (const user of users){
            await api
            .post('/api/users')
            .send(user) 
        }
    })
    test('verify if it rejects an invalid username(its length is less than 3)', async()=>{
        await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const userList = await User.find({ username: userWithShortUsername.username})
        assert.strictEqual(userList.length, 0)
    })
    test('verify if it rejects an invalid password(its length is less than 3)', async()=>{
        await api
            .post('/api/users')
            .send(userWithShortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const userList = await User.find({ username: userWithShortPassword.username})
        assert.strictEqual(userList.length, 0)
    })
})
after(async () => {
    await mongoose.connection.close()
})