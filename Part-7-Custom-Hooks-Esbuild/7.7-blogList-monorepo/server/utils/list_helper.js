import collections from "lodash"
const {groupBy, map:mapColl} = collections


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
    const {author, likes} = highest(blogs,"likes")
    if (author && likes){
        return {author, likes}
    }
    else{
        return {}
    }
}

const agregateByAuthor = (blogs,{key,callback}) => {
    const authBlog = groupBy(blogs, blogs=>blogs.author)
    return mapColl(authBlog, (blogList, author)=>{return {author:author, [key]: callback(blogList)}})
}

const mostBlogs = blogs => {
    const authors = agregateByAuthor(blogs, {
        key: "blogs",
        callback: list=>list.length
    })
    return highest(authors, "blogs")
}

const mostLikes = blogs => {
    const authors = agregateByAuthor(blogs, {
        key: "likes",
        callback: list => totalLikes(list)
    })
    return highest(authors, "likes")
}


export{
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}