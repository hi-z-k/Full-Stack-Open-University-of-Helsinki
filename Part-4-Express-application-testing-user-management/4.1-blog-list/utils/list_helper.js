const dummy = blogs => 1

const totalLikes = blogs => {
    let likesCount = blogs.reduce((count,blog)=>count+=blog.likes, 0)
    return likesCount
}

const favoriteBlog = blogs => {
    let favBlog = blogs.reduce((max, blog)=>
        (max.likes >= blog.likes) ? max : blog
    , {})
    return favBlog
}

export{
    dummy,
    totalLikes, 
    favoriteBlog
}