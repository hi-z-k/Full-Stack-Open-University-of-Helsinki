import collections from "lodash"
const {groupBy} = collections


const dummy = blogs => 1

const totalLikes = blogs => {
    let likesCount = blogs.reduce((count,blog)=>count+=blog.likes, 0)
    return likesCount
}

const highest = (coll, param) =>{
    return coll.reduce((max, blog)=>
        (max[param] >= blog[param]) ? max : blog
    , {})
}

const favoriteBlog = blogs => {
    return highest(blogs,"likes")
}


const mostBlogs = blogs => {
    const authBlog = groupBy(blogs, blogs=>blogs.author)
    const authors = Object.keys(authBlog).map(author=>{return {author, blogs: authBlog[author].length}})
    return highest(authors, "blogs")
}


export{
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs
}