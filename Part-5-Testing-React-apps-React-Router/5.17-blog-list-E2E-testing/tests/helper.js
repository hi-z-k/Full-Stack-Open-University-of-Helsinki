import { expect, newContext } from "@playwright/test"

const loginWith = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const loginWithRouted = async (page, username, password) => {
  await page.getByRole('link', { name: 'login' }).click()
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const loginWithWait = async (page, username, password) => {
  await loginWith(page, username, password)
  await expect(page.getByText('logged in')).toBeVisible()
}


const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByRole('textbox', { name: 'title' }).fill(title)
  await page.getByRole('textbox', { name: 'author' }).fill(author)
  await page.getByRole('textbox', { name: 'url' }).fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  await expect(page.locator('.blog', { hasText: title })).toBeVisible()
}
const createBlogRouted = async (page, title, author, url) => {
  await page.getByRole('link', { name: 'new blog' }).click()
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByRole('textbox', { name: 'title' }).fill(title)
  await page.getByRole('textbox', { name: 'author' }).fill(author)
  await page.getByRole('textbox', { name: 'url' }).fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  await expect(page.getByRole('link', { name: title })).toBeVisible();
}

const createSampleMultipleBlogs = async (page, request) => {
  const blogs = [
    {
      title: "1984",
      author: "George Orwell",
      url: "https://www.archive.org/details/1984-george-orwell",
      likes: 8540
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      url: "https://www.deadcaulfields.com",
      likes: 4150
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      url: "https://www.britannica.com/topic/To-Kill-a-Mockingbird",
      likes: 9300
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      url: "https://www.huxley.net/bnw/one.html",
      likes: 6210
    }
  ]

  const token = await page.evaluate(() => {
    const user = localStorage.getItem('loginUser')
    return user ? JSON.parse(user).token : null
  })
  if (!token) throw new Error('Not logged in')


  for (const blog of blogs) {
    const response = await request.post('/api/blogs', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: { title: blog.title, author: blog.author, url: blog.url }
    })
    const { id } = await response.json()
    await request.put(`/api/blogs/${id}`, { data: { likes: blog.likes } })
  }
}
export { loginWith, loginWithRouted, loginWithWait, createBlog, createBlogRouted, createSampleMultipleBlogs }

