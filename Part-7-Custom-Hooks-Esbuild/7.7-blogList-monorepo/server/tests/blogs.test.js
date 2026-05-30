import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import app from '../app.js'
import supertest from 'supertest'
import { initialBlogs } from './initialBlogs.js'
import Blog from '../models/blog.js'
import { info } from '../utils/logger.js'
import { blogs, listWithOneBlog } from './blogs.js'
import User from '../models/user.js'
import users from './users.js'
import { loginUser, newBlog } from './auth-blog.js'

const api = supertest(app)

const login = async (api, data)=> {
    const {body} = await api
        .post("/api/login")
        .send(data)
    if (!body.token){
        throw new Error("Login failed")
    }
    return body.token
}


describe('Tests on Blog Router', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const userPromises = users.map(user => {
            const userObj = new User({
                ...user
            })
            return userObj.save()
        })
        await Promise.all(userPromises)
        const blogPromises = initialBlogs.map(content => new Blog(content).save())
        await Promise.all(blogPromises)
    })

    test('The cluster contains the correct number of Blog posts', async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogCount = response.body.length
        assert.strictEqual(blogCount, initialBlogs.length)
    })

    test('The unique identifier for the blog is named id', async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blog = response.body[0]
        
        assert.ok(blog.id)
        assert.strictEqual(typeof blog.id, 'string')
        assert.strictEqual(blog._id, undefined)
    })

    test('The blog is saved to database correctly', async () => {
        const token = await login(api,loginUser)
        const {title, url, author, user} = newBlog
        const response = await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send({title, url, author, user})
            .expect(201)
            
        const blog = response.body
            
        const blogsAtEnd = await api.get("/api/blogs")
        assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)
        
        assert.strictEqual(blog.title, title)
        assert.strictEqual(blog.author, author)
        assert.strictEqual(blog.url, url)
    })

    test('The blog like defaults to zero if likes is not provided', async () => {
        const token = await login(api,loginUser)
        const {title, url, author, user} = newBlog
        const blogWithNoLikes = {title, url, author, user}
        
        const response = await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send(blogWithNoLikes)
            .expect(201)
            
        assert.strictEqual(response.body.likes, 0)
    })

    test('If title or url is missing from the blog being requested, the router will respond with HTTP 400', async () => {
        const token = await login(api,loginUser)
        const {author, user} = newBlog
        await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send({author, user})
            .expect(400)
    })
        test('It prohibits adding of blogs if token is not provided/invalid', async () => {
        const token = ""
        const {title, url, author, user} = newBlog
        const response = await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send({title, url, author, user})
            .expect(401)
    })
})

after(async () => {
    await mongoose.connection.close()
})