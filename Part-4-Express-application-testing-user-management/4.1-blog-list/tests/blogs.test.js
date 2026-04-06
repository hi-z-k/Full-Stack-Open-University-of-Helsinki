import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import app from '../app.js'
import supertest from 'supertest'
import { initialBlogs } from './initialBlogs.js'
import Blog from '../models/blog.js'
import { info } from '../utils/logger.js'
import { listWithOneBlog } from './blogs.js'


const api = supertest(app)

describe('Tests on Blog Router', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const promises = initialBlogs
            .map(content => new Blog(content))
            .map(blog => blog.save())
        await Promise.all(promises)
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
        const content = initialBlogs[0]
        const isIdCreated =
            "id" in blog &&
            !("id" in content) &&
            !("_id" in blog)

        assert.strictEqual(isIdCreated, true)
    })
    test('The blog is saved to database correctly', async () => {
        const {title,url,author} = listWithOneBlog[0]
        const sendBlog = await api
            .post("/api/blogs")
            .send({title,url,author})
            .expect(201)
        const blog = sendBlog.body
            
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const currBlogCount = response.body.length
        const prevBlogCount = initialBlogs.length
        const isASingleBlogAdded = currBlogCount == prevBlogCount + 1
        assert.ok(isASingleBlogAdded, "It isn't a single blog that is added")
        
        const isSavedCorrectly = 
            blog.title == title &&
            blog.author == author &&
            blog.url == url 
        assert.strictEqual(isSavedCorrectly, true)
    })
    test.only('The blog like defaults to zero if likes is not provided',async()=>{
        const {title,url,author} = listWithOneBlog[0]
        const blogWithNoLikes = {title,url,author}
        const sendBlog = await api
            .post("/api/blogs")
            .send(blogWithNoLikes)
            .expect(201)
        const blog = sendBlog.body
        assert.strictEqual(blog.likes, 0)
        assert.strictEqual("likes" in blogWithNoLikes, false)
    })
})
after(async () => {
    await mongoose.connection.close()
})