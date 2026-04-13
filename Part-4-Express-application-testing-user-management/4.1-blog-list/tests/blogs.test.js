import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import app from '../app.js'
import supertest from 'supertest'
import { initialBlogs } from './initialBlogs.js'
import Blog from '../models/blog.js'
import { info } from '../utils/logger.js'
import { listWithOneBlog } from './blogs.js'
import User from '../models/user.js'
import users from './users.js'

const api = supertest(app)

describe('Tests on Blog Router', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const userPromises = users.map(user => {
            const userObj = new User({
                ...user,
                passwordHash: '$2b$10$.SR8zdled1Pgxel.KNxDoeZmVqTD6xKu.b.rxhLPow.NDGyl1zYk.'
            })
            return userObj.save()
        })
        await Promise.all(userPromises)

        const blogPromises = initialBlogs.map(content => new Blog(content).save())
        await Promise.all(blogPromises)
    })

    test('The cluster contains 4+ Blog posts', async () => {
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
        const {title, url, author, user} = listWithOneBlog[0]
        const response = await api
            .post("/api/blogs")
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
        const {title, url, author, user} = listWithOneBlog[0]
        const blogWithNoLikes = {title, url, author, user}
        
        const response = await api
            .post("/api/blogs")
            .send(blogWithNoLikes)
            .expect(201)
            
        assert.strictEqual(response.body.likes, 0)
    })

    test('If title or url is missing from the blog being requested, the router will respond with HTTP 400', async () => {
        const {author, user} = listWithOneBlog[0]
        await api
            .post("/api/blogs")
            .send({author, user})
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})