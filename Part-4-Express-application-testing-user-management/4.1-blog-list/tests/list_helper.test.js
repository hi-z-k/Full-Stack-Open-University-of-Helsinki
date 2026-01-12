import { test, describe } from 'node:test'
import assert from 'node:assert'
import { dummy, totalLikes, favoriteBlog } from '../utils/list_helper.js'
import { blogs, listWithOneBlog } from './blogs.js'

test('dummy returns one', () => {
  const blogs = []
  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has many blogs', () => {
    const result = totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
  test('when list have no blog', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  test('when list have no blog', () => {
    const result = favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, ...listWithOneBlog)
  })
  test('when list has many blogs', () => {
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})