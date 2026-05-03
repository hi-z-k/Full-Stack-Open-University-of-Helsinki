import { useState } from 'react'


const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNote = (e) => {
    e.preventDefault()
    onCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return <form onSubmit={handleNote}>
    <h3>Create a new Blog</h3>
    <div>
      <label>
        title
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        url
        <input
          type="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
    </div>
    <button type="submit">Create</button>
  </form>
}

export default BlogForm