import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

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

test('Blog renders title and author only by default',() => {
  render(<Blog data={{ blog, user:blog.user }}/>)
  const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`)
  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(blog.likes)

  expect(titleAndAuthor).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('Blog shows URL & likes when "view" button is clicked', async() => {
  render(<Blog data={{ blog, user:blog.user }}/>)
  let url = screen.queryByText(blog.url)
  let likes = screen.queryByText(blog.likes)

  expect(url).toBeNull()
  expect(likes).toBeNull()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  url = screen.getByText(blog.url)
  likes = screen.getByText(blog.likes, { exact: false })

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})


test('Blog "like" button is clicked twice, it calls the handler twice', async() => {
  const mockHandleLike = vi.fn()
  render(<Blog data={{ blog, user:blog.user }} onLike={mockHandleLike}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  let likeButton = screen.getByRole('button',{ name:/like/ })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})