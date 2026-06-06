import { create } from 'zustand'
import * as blogService from '../services/blogs'

const useBlogsStore = create(() => ({
    blogs: [],
    loading: false,
    error: null
}))


const _requester = async (serviceCallback, transformer= (blogs)=>blogs ) => {
    useBlogsStore.setState({
        loading: true,
    })
    try {
        const response = await serviceCallback()
        const data = transformer(response)
        const blogs = data.toSorted((a, b) => b.likes - a.likes)
        useBlogsStore.setState({ blogs, loading: false, error: null })
    } catch (error) {
        useBlogsStore.setState({ error: error.message, loading: false })
    }
}

const _onLike = async (blog, likeService) => {
    try {
        const updatedBlog = await likeService(blog)
        useBlogsStore.setState((state) => ({
            blogs: state.blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        }))
    } catch (error) {
        useBlogsStore.setState({ error: error.message })
    }
}

const getAll = () => {
    _requester(blogService.getAll)
}

const createBlog = (newBlog) => {
    _requester(
        () => blogService.createBlog(newBlog),
        (blog) => useBlogsStore.getState().blogs.concat(blog)
    )
}
const addComment = async (id, newComment) => {
    try {
        const comment = await blogService.addComment(id, newComment)
        
        useBlogsStore.setState((state) => ({
            blogs: state.blogs.map(blog => blog.id === id ? { ...blog, comments: blog.comments.concat(comment) } : blog)
        }))
    } catch (error) {
        useBlogsStore.setState({ error: error.message })
    }
}

const deleteBlog = (id) => {
    _requester(
        () => blogService.deleteBlog(id),
        () => useBlogsStore.getState().blogs.filter((b) => b.id !== id)
    )
}

const addLike = (blog) => _onLike(blog, blogService.addLike)
const removeLike = (blog) => _onLike(blog, blogService.removeLike)

export const blogActions = {
    getAll,
    createBlog,
    deleteBlog,
    addComment,
    addLike,
    removeLike
}

const useBlogs = () => {
    const blogsStore = useBlogsStore()
    return {
        blogs: blogsStore.blogs,
        loading: blogsStore.loading,
        error: blogsStore.error,
        actions: blogActions
    }
}

export default useBlogs