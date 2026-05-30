import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test } from 'vitest'
import BlogForm from './BlogForm'

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

test('Blog form should send the correct data collected from the user',async() => {
  const mockHandleCreate = vi.fn()
  render(<BlogForm onCreate={mockHandleCreate}/>)

  const user = userEvent.setup()

  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)

  let createButton = screen.getByText('Create')
  await user.click(createButton)

  const receivedData = mockHandleCreate.mock.calls[0][0]

  expect(receivedData.title).toBe(blog.title)
  expect(receivedData.author).toBe(blog.author)
  expect(receivedData.url).toBe(blog.url)
})