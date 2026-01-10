import { test, describe }  from 'node:test'
import assert from 'node:assert'
import {dummy, totalLikes} from '../utils/list_helper.js'
import {blogs,listWithOneBlog} from './blogs.js'

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
  test('when list has many blogs',()=>{
    const result = totalLikes(blogs)
    assert.strictEqual(result,36)
  })
  test('when list have no blog',()=>{
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })
})