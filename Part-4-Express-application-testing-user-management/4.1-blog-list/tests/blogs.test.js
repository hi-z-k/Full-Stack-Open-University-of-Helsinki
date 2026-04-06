import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import app from '../app.js'
import supertest from 'supertest'
import { initialBlogs } from './initialBlogs.js'
import Blog from '../models/blog.js'
import { info } from '../utils/logger.js'

const api = supertest(app)

describe('Tests on Blog Router',()=>{
    beforeEach(async()=>{
        await Blog.deleteMany({})
        const promises = initialBlogs
        .map(content=> new Blog(content))
        .map(blog => blog.save())
        await Promise.all(promises)
    })
    test('The cluster contains 4+ Blog posts',async ()=>{
        const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const blogCount = response.body.length 
        assert.strictEqual(blogCount, initialBlogs.length)
    })
    test.only('The unique identifier for the blog is named id',async ()=>{
        const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const blog = response.body[0]
        const content = initialBlogs[0]
        const isIdCreated = 
                "id" in blog &&
                !("id" in content) &&
                !("_id" in blog) 

        assert.strictEqual(isIdCreated, true)
    })
})
after(async () => {
    await mongoose.connection.close()
})