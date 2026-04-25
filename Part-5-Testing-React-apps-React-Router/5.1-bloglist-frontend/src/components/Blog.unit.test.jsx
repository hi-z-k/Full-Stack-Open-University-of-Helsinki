import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders title and author only by default',() => {
  const blog = {
    'title': 'Brave New World',
    'author': 'Aldous Huxley',
    'url': 'https://www.huxley.net/bnw/one.html',
    'likes': 6213,
    'user': {
      'name': 'Lucrezia Borgia',
      'username': 'lborgia',
      'id': '1'
    },
    'id': '2'
  }
  render(<Blog data={{ blog, user:blog.user }}/>)
  const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`)
  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(blog.likes)


  expect(titleAndAuthor).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})